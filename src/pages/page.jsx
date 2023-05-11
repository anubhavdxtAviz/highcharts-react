import React from 'react';
import {
  genCpuConsump,
  genCpuTemp,
  genCpuUtil,
  genMemUtil,
  genFanSpeed,
  genServRunning,
} from '../mock/mockData1';
import ChartGroup from '../components/chartGroup-faulty';
import ChartReact from '../components/chartReact';

export default function DeviceLevelView({ showNull }) {
  const [requiredPayload, setRequiredPayload] = React.useState({});
  const [reRenderTrigger, setReRenderTrigger] = React.useState(1);

  const genState = () => ({
    CpuUtilizationData: genCpuUtil(showNull),
    MemoryUtilizationData: genMemUtil(showNull),
    ServicesRunningListData: genServRunning(showNull),
    CpuConsumptionListData: genCpuConsump(showNull),
    FanSpeedData: genFanSpeed(showNull),
    CpuTemperatureData: genCpuTemp(showNull),
    cpuConsump: genCpuUtil(showNull),
    memConsump: genMemUtil(showNull),
    servicesConsump: genServRunning(showNull),
    psuSpeedData: genFanSpeed(showNull),
  });

  const [state, setState] = React.useState(genState());

  //refs
  const intervalRef = React.useRef();

  //queries

  const isLoading = false;
  // console.log({state});

  const startInterval = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      // console.log(' calling refetch');
      refetchAllData();
      // scheduleReRender();
    }, 10000);
  };

  // const scheduleReRender = () => {
  //   setTimeout(() => setReRenderTrigger((val) => val + 1), 1000);
  // };

  const refetchAllData = () => {
    setState(genState());
  };


  React.useEffect(() => {
    startInterval();
  }, []);

  const buildOps = () => {
    // console.log({ CpuUtilizationData });
    let obj = [
      {
        headerData: {
          title: 'Cpu Utilization',
          subTitle: 'For This Device',
        },
        data: [
          {
            name: 'cpuUtil',
            series: state.CpuUtilizationData[0].data,
          },
        ],
      },
      {
        headerData: {
          title: 'Memory Utilization',
          subTitle: 'For This Device',
        },
        data: [
          {
            name: 'MemUtil',
            series: state.MemoryUtilizationData[0].data,
          },
        ],
      },

      {
        headerData: {
          title: 'Cpu Temperature',
          subTitle: 'For This Device',
        },
        data: state.CpuTemperatureData.map((item) => ({
          name: item.name,
          series: item.data,
        })),
      },

      {
        headerData: {
          title: 'Fan Speed',
          subTitle: 'For This Device',
        },
        data: state.FanSpeedData.map((item) => ({
          name: item.name,
          series: item.data,
        })),
      },
      {
        headerData: {
          title: 'PSU Temperature',
          subTitle: 'For This Device',
        },
        data: state.cpuConsump.map((item) => ({
          name: item.name,
          series: item.data,
        })),
      },
      {
        headerData: {
          title: 'PSU Voltage',
          subTitle: 'For This Device',
        },
        data: state.memConsump.map((item) => ({
          name: item.name,
          series: item.data,
        })),
      },
      {
        headerData: {
          title: 'PSU Current',
          subTitle: 'For This Device',
        },
        data: state.servicesConsump.map((item) => ({
          name: item.name,
          series: item.data,
        })),
      },
      {
        headerData: {
          title: 'PSU Power',
          subTitle: 'For This Device',
        },
        data: state.psuSpeedData.map((item) => ({
          name: item.name,
          series: item.data,
        })),
      },
      {
        headerData: {
          title: 'Services Running',
          subTitle: 'For This Device',
        },
        data: state.ServicesRunningListData.map((item) => ({
          name: item.name,
          series: item.data,
        })),
      },
      {
        headerData: {
          title: 'CPU Consumption',
          subTitle: 'For This Device',
        },
        data: state.CpuConsumptionListData.map((item) => ({
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
    <>
      <div>
        {!isLoading && (
          <ChartReact
            // refreshTrigger={reRenderTrigger}
            baseOptions={buildOps()}
          />
        )}
      </div>
    </>
  );
}
