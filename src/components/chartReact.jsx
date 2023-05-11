import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import highcharts from 'highcharts/highstock';
import StockChart from './stockChart';
import { buildSeries } from './chartGroup';

const graphColors = [
  '#7CB5EC',
  '#434348',
  '#959595',
  '#737FA6',
  '#32384E',
  '#DBC3A3',
  '#A57A41',
  '#805F32',
  '#515059',
  '#37363C',
  '#929BBA',
  '#59658C',
  '#454F6D',
  '#32384E',
  '#CDAB7F',
  '#BE935A',
];

function ChartReact({ baseOptions }) {
  const charts = React.useRef([]);
  const syncRef = React.useRef((e) => {
    console.log({ e });
    charts.current.forEach((chart) => {
      chart.xAxis[0].setExtremes(e.min, e.max);
      chart.showResetZoom();
    });
  });
  const buildOptions = React.useCallback(
    (item) => ({
      series: buildSeries(item),
      xAxis: {
        events: {
          afterSetExtremes: function (e) {
            syncRef.current(e);
          },
        },
      },
      yAxis: {
        opposite: false,
        crosshair: {
          snap: true,
        },
      },
      colors: graphColors,
      chart: {
        height: 320,
        width: 580,
        type: item.chartType || 'line',
      },
      navigator: {
        enabled: true,
      },
      rangeSelector: {
        enabled: false,
      },
      scrollbar: {
        enabled: true,
      },
    }),
    []
  );
  // React.useEffect(() => {
  //   console.log({ ref });
  // }, []);
  return (
    <>
      {baseOptions.map((item, index) => (
        <StockChart
          options={buildOptions(item)}
          highcharts={highcharts}
          titleData={item.headerData}
          callback={(chart) => charts.current.push(chart)}
          // ref={refs[index]}
        />
      ))}
    </>
  );
}

export default ChartReact;
