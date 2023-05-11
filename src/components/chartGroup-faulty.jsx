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
    dashStyle = '';

    if (previous !== null && current === null) {
      dashStyle = 'solid';
      value = data[i - 1][0];
      color = '#7CB5EC';
    } else if (previous === null && current !== null) {
      dashStyle = 'dot';
      value = data[i][0];
      color = 'red';
    }

    if (dashStyle) {
      zones.push({
        dashStyle: dashStyle,
        value: value,
        color: color,
      });
    }
  }
  return zones;
}

function buildSeries(item) {
  return item.data.map((itemSeries) => ({
    // zones: buildZones(itemSeries.series),
    name: itemSeries.name,
    // zoneAxis: 'x',
    data: itemSeries.series,
    connectNulls: false,
    // showInNavigator: true,
  }));
}

const shouldSyncNavigator = true;

function ChartGroup({ baseOptions: options, refreshTrigger }) {
  const ref = React.useRef(null);
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

  const data = React.useMemo(() => {
    return options.map((item) => ({
      series: buildSeries(item),

      xAxis: {
        events: {
          afterSetExtremes: function (e) {
            // console.log({ e });
            if (shouldSyncNavigator) {
              charts.current.forEach((chart) => {
                chart.xAxis[0].setExtremes(e.min, e.max);
                chart.showResetZoom();
              });
              addRemoveHndlr.current();
            }
          },
        },
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
        // console.log({ chart: charts.current[chartIndex], series });
      });
    }
    renderCount.current += 1;
  }, [refreshTrigger]);

  console.log('re-rendering');

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
        />,
        div
      );
      chart.parentNode.prepend(div);
    });
  }, []);

  // React.useEffect(() => {
  //   renderCount.current = renderCount.current + 1;

  //   if (renderCount.current > 1) {
  //     console.log('later re render');
  //   }
  // }, [options]);

  // console.log({ charts });

  return <div ref={ref}></div>;
}

export default ChartGroup;

function ChartHeader({ legends = [], options, chartIndex, charts }) {
  // console.log({series});
  const { headerData: headers } = options;
  const { data: seriesData } = options;

  // console.log({ seriesData });

  const handleChage = (e) => {
    const index = e.target.value;

    if (index == -1) {
      charts[chartIndex].series.forEach((item) =>
        item.setVisible(true)
      );
    } else {
      charts[chartIndex].series.forEach((item) => {
        item.setVisible(false);
      });
      charts[chartIndex].series[index].setVisible(true);
    }

    // charts[chartIndex].navigator.series.forEach((item) =>
    //   item.setVisible(true)
    // );

    // charts[chartIndex].redraw();
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
