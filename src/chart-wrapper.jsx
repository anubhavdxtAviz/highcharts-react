import React from 'react';
import mockCpuUtil from './mock/mockData1/cpuUtil';
import mockMemUtil from './mock/mockData1/memUtil';
import mockServicesRunning from './mock/mockData1/servRun';
import mockFanSpeed from './mock/mockData1/fanSpeed';
import mockCpuConsumption from './mock/mockData1/cpuConsump';
import mockCpuTemp from './mock/mockData1/cpuTemp';
import ChartGroup from './components/chartGroup';

function ChartWrapper() {
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);
  const [data, setData] = React.useState({
    cpuUtil: mockCpuUtil,
    memUtil: mockMemUtil,
    fanSpeed: mockFanSpeed,
    cpuTemp: mockCpuTemp,
    cpuConsump: mockCpuConsumption,
    servRunning: mockServicesRunning,
  });

  const refetchData = () => {
    setData((val) => Object.keys(val).map((key) => {
      return 
    }));
  };

  React.useEffect(() => {
    setInterval(() => {
      // console.log('re-rendering');

      setRefreshTrigger((val) => val + 1);
    }, 10000);
  }, []);

  const buildOps = () => {
    let obj = [
      {
        headerData: {
          title: 'Cpu Utilization',
          subTitle: 'For This Device',
        },
        data: [{ name: 'cpuUtil', series: data.cpuUtil[0].data }],
      },
      {
        headerData: {
          title: 'Memory Utilization',
          subTitle: 'For This Device',
        },
        data: [{ name: 'MemUtil', series: data.memUtil[0].data }],
      },

      {
        headerData: {
          title: 'Cpu Temperature',
          subTitle: 'For This Device',
        },
        data: data.cpuTemp.map((item) => ({
          name: item.name,
          series: item.data,
        })),
      },

      {
        headerData: {
          title: 'Fan Speed',
          subTitle: 'For This Device',
        },
        data: data.fanSpeed.map((item) => ({
          name: item.name,
          series: item.data,
        })),
      },
      // {
      //   headerData: {
      //     title: 'PSU Temperature',
      //     subTitle: 'For This Device',
      //   },
      //   data: PsuTemperatureData.map((item) => ({
      //     name: item.name,
      //     series: item.data,
      //   })),
      // },
      // {
      //   headerData: {
      //     title: 'PSU Voltage',
      //     subTitle: 'For This Device',
      //   },
      //   data: PsuVoltageData.map((item) => ({
      //     name: item.name,
      //     series: item.data,
      //   })),
      // },
      // {
      //   headerData: {
      //     title: 'PSU Current',
      //     subTitle: 'For This Device',
      //   },
      //   data: PsuCurrentData.map((item) => ({
      //     name: item.name,
      //     series: item.data,
      //   })),
      // },
      // {
      //   headerData: {
      //     title: 'PSU Power',
      //     subTitle: 'For This Device',
      //   },
      //   data: PsuPowerData.map((item) => ({
      //     name: item.name,
      //     series: item.data,
      //   })),
      // },
      {
        headerData: {
          title: 'Services Running',
          subTitle: 'For This Device',
        },
        data: data.servRunning.map((item) => ({
          name: item.name,
          series: item.data,
        })),
      },
      {
        headerData: {
          title: 'CPU Consumption',
          subTitle: 'For This Device',
        },
        data: data.cpuConsump.map((item) => ({
          name: item.name,
          series: item.data,
        })),
      },
      // {
      //   headerData: {
      //     title: 'Memory Consumption',
      //     subTitle: 'For This Device',
      //   },
      //   data: MemoryConsumptionListData.map((item) => ({
      //     name: item.name,
      //     series: item.data,
      //   })),
      // },
    ];

    return obj;
  };

  return (
    <div>
      <ChartGroup
        baseOptions={buildOps()}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
}

export default ChartWrapper;
