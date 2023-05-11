import React from 'react';
import HighchartsReact from 'highcharts-react-official';

const StockChart = ({ options, highcharts, titleData, callback }) => (
  <>
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '20px' }}>{titleData.title}</span>
        <span style={{ fontSize: '16px' }}>{titleData.subTitle}</span>
      </div>
    </div>
    <HighchartsReact
      highcharts={highcharts}
      constructorType={'stockChart'}
      options={options}
      callback={callback}
    />
  </>
);
export default StockChart;
