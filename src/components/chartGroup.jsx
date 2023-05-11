import React from 'react';
import ReactDom from 'react-dom';
import Highcharts from 'highcharts/highstock';
import { renderToStaticMarkup } from 'react-dom/server';

function buildZones(data) {
  // console.log({data});
  var zones = [],
    i = -1,
    len = data.length,
    current,
    previous,
    dashStyle,
    value,
    color;
  while (i < len && data[++i]?.[1] === null) {
    // console.log({ data: data[i + 1] });
    zones.push({
      value: data[i][0],
    });
  }

  while (++i < len) {
    previous = data[i - 1][1];
    current = data[i][1];
    // dashStyle = 'solid';

    if (previous !== null && current === null) {
      // dashStyle = 'solid';
      value = data[i - 1][0];
      color = '#7CB5EC';
    } else if (previous === null && current !== null) {
      dashStyle = 'dot';
      value = data[i][0];
      color = 'red';
    }

    if (true) {
      zones.push({
        dashStyle: dashStyle,
        value: value,
        color: color,
      });
    }
  }
  return zones;
}

export function buildSeries(item) {
  return item.data.map((itemSeries) => ({
    // zones: buildZones(itemSeries.series),
    name: itemSeries.name,
    zoneAxis: 'x',
    data: itemSeries.series,
    connectNulls: false,
    showInNavigator: true,
  }));
}

const shouldSyncNavigator = true;

function ChartGroup({ baseOptions: options, refreshTrigger }) {
  const ref = React.useRef(null);
  const addedPaths = React.useRef([]);
  const renderCount = React.useRef(0);
  const charts = React.useRef();
  const deleteZoomBtns = React.useRef(() => {
    let btns = ref.current.querySelectorAll('.highcharts-reset-zoom');
    btns.forEach((btn) => btn.remove());
  });
  const addRemoveHndlr = React.useRef(() => {
    let btns = ref.current.querySelectorAll('.highcharts-reset-zoom');
    btns.forEach((btn) =>
      btn.addEventListener('click', deleteZoomBtns.current)
    );
  });

  // const redrawSeries

  const data = React.useMemo(() => {
    return options.map((item) => ({
      series: buildSeries(item),

      xAxis: {
        events: {
          afterSetExtremes: function (e) {
            // console.log({ e });
            // if (shouldSyncNavigator) {
            //   charts.current.forEach((chart) => {
            //     chart.xAxis[0].setExtremes(e.min, e.max);
            //     chart.showResetZoom();
            //   });
            //   addRemoveHndlr.current();
            // }
          },
        },
      },
      chart: {
        width: 600,
        height: (9 / 16) * 600,
      },
      navigator: {
        enabled: false,
      },
      rangeSelector: {
        enabled: false,
      },
      scrollbar: {
        enabled: false,
      },
    }));
  }, []);

  React.useEffect(() => {
    if (renderCount.current > 0) {
      console.log('re-render trigger called');
      options.forEach((ops, chartIndex) => {
        const series = buildSeries(ops);
        // charts.current[i].update({ series: series }, true, true);
        series.forEach((item, index) => {
          charts.current[chartIndex].series[index].setData(item.data);
        });
        clearAddedPaths();
        drawNullMarkers();
      });
    }
    renderCount.current += 1;
  }, [refreshTrigger]);

  const dottedLinesUtil = ({
    rawData,
    processedData,
    renderer,
    plotLeft,
    plotTop,
  }) => {
    const seriesData = rawData.data;
    for (let i = 1; i < seriesData.length; i++) {
      let path = [];
      const currPoint = seriesData[i];

      if (currPoint[1] == null) {
        let p1 = processedData.points[i - 1];
        let p2 = processedData.points[i + 1];
        // console.log({ p1, p2 });
        p2 = p2 == undefined ? p1 : p2;

        path.push('M');
        path.push(p1.plotX + plotLeft, p1.plotY + plotTop);
        // path.push('L');
        path.push('L');
        path.push(p2.plotX + plotLeft, p2.plotY + plotTop);
      }

      const line = renderer
        .path(path)
        .attr({
          'stroke-width': 1,
          // stroke: Highcharts.getOptions().colors[0],
          stroke: 'red',
          dashstyle: 'ShortDash',
        })
        .add();

      // console.log({ line });
      line.element.classList.add('added-path');
      addedPaths.current.push(line);
      // return line;
    }
  };

  const drawNullsForChart = (i) => {
    const currChart = charts.current[i];
    const plotLeft = currChart.plotLeft;
    const plotTop = currChart.plotTop;

    data[i].series.forEach((currSeries, index) => {
      const isVisible =
        currChart.series[index].customVisibility !== false;

      console.log({ currSeries: currSeries.name, isVisible });
      if (isVisible) {
        dottedLinesUtil({
          rawData: currSeries,
          processedData: currChart.series[index],
          renderer: currChart.renderer,
          plotLeft,
          plotTop,
        });
      }
    });
  };

  const drawNullMarkers = () => {
    charts.current.forEach((chart, index) =>
      drawNullsForChart(index)
    );
  };

  const clearAddedPaths = (index) => {
    if (index) {
      const cont = charts.current[index].container;

      cont.querySelectorAll('.added-path').forEach((item) => {
        console.log({ item });
        item.remove();
      });
      // console.log({currChart});
    }
    addedPaths.current.forEach((item) => {
      // console.log({ item });
      item.element.remove();
    });
    addedPaths.current = [];
  };

  React.useEffect(() => {
    // console.log('re-rendering chart group');
    const chartEls = [];
    ref.current.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
      let elem = document.createElement('div');
      ref.current.appendChild(elem);
      const currChart = Highcharts.stockChart(elem, data[i]);

      chartEls.push(currChart);
    }
    charts.current = chartEls;
    drawNullMarkers();

    const chartConts = ref.current.querySelectorAll(
      '.highcharts-container '
    );
    chartConts.forEach((chart, index) => {
      // console.log({chart:chart.parentNode});
      let div = document.createElement('div');

      ReactDom.render(
        <ChartHeader
          options={options[index]}
          chartIndex={index}
          charts={chartEls}
          reDrawDottedLines={(index) => {
            clearAddedPaths();
            drawNullMarkers();
          }}
        />,
        div
      );
      chart.parentNode.prepend(div);
    });
  }, []);

  return (
    <div
      ref={ref}
      style={{ display: 'flex', flexWrap: 'wrap' }}
    ></div>
  );
}

export default ChartGroup;

function ChartHeader({
  legends = [],
  options,
  chartIndex,
  charts,
  reDrawDottedLines,
}) {
  // console.log({series});
  const { headerData: headers } = options;
  const { data: seriesData } = options;

  // console.log({ seriesData });

  const handleChage = (e) => {
    const index = e.target.value;

    if (index == -1) {
      charts[chartIndex].series.forEach((item) => {
        item.setVisible(true);
        item.customVisibility = true;
      });
    } else {
      charts[chartIndex].series.forEach((item) => {
        item.setVisible(false);
        item.customVisibility = false;
      });
      charts[chartIndex].series[index].setVisible(true);
      charts[chartIndex].series[index].customVisibility = true;
      console.log({ item: charts[chartIndex].series[index] });
      // console.log({item});
    }

    reDrawDottedLines(chartIndex);
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ textAlign: 'start' }}>
        <p style={{ fontSize: '18px', margin: 0, fontWeight: 500 }}>
          {headers.title}
        </p>
        <p style={{ fontSize: '14px', margin: 0 }}>
          {headers.subTitle}
        </p>
      </div>

      {seriesData.length > 1 && (
        <div style={{ marginRight: 'auto', marginLeft: '20px' }}>
          <select onChange={handleChage}>
            <option value={-1}>Show All</option>
            {seriesData.map((dataItem, index) => (
              <option value={index} key={dataItem.name}>
                {dataItem.name}{' '}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        {legends.map((item) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '18px',
                background: item.color,
              }}
            ></div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// function SeriesSelect({}) {

// }
