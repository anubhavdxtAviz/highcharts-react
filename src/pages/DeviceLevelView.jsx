import React from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import moment from 'moment';
import {
  GetCpuConsuptionData,
  GetCpuTemperature,
  GetCpuUtilization,
  GetDeviceInfo,
  GetFanSpeed,
  GetMemoryConsuptionData,
  GetMemoryUtilization,
  GetPsuCurrent,
  GetPsuPower,
  GetPsuTemperature,
  GetPsuVoltage,
  GetServicesRunning,
  GetMegeHealthInfo,
} from '../api/platform.query';
import {
  genCpuConsump,
  genCpuTemp,
  genCpuUtil,
  genMemUtil,
  genFanSpeed,
  genServRunning,
} from '../mock/mockData1';
import ChartGroup from '../components/chartGroup-faulty';

// console.log({ mock1, mock2, mock3, mock4 });

export default function DeviceLevelView({ showNull }) {
  const WidgetHeight = 370; //changing the heights for more visibility in tooltip, this also can be dynamic in future
  const { id } = useParams();
  // console.log({id});
  // const id = '0c:29:ef:ce:92:20';
  const [unitValue, setUnitValue] = React.useState('minute');
  const [deviceDetails, setDeviceDetails] = React.useState({});
  const [trigger, setTrigger] = React.useState(1);
  const [requiredPayload, setRequiredPayload] = React.useState({});
  const [reRenderTrigger, setReRenderTrigger] = React.useState(1);

  const genState = () => ({
    CpuUtilizationData: genCpuUtil(showNull),
    MemoryUtilizationData: genMemUtil(showNull),
    ServicesRunningListData: genServRunning(showNull),
    CpuConsumptionListData: genCpuConsump(showNull),
    FanSpeedData: genFanSpeed(showNull),
    CpuTemperatureData: genCpuTemp(showNull),
  });

  const [state, setState] = React.useState(genState());

  //refs
  const intervalRef = React.useRef();

  //queries

  // const {
  //   data: deviceInfoData,
  //   isLoading: isDeviceInfoDataLoading,
  //   refetch: refetchDeviceInfoData,
  // } = GetDeviceInfo({
  //   key: trigger,
  //   payload: requiredPayload,
  //   enabled: Object.keys(requiredPayload).length !== 0,
  // });

  // const {
  //   data: CpuUtilizationData,
  //   isLoading: isCpuUtilizationDataLoading,
  //   refetch: refetchCpuUtilizationData,
  // } = GetCpuUtilization({
  //   key: trigger,
  //   payload: requiredPayload,
  //   enabled: Object.keys(requiredPayload).length !== 0,
  // });

  // const {
  //   data: MemoryUtilizationData,
  //   isLoading: isMemoryUtilizationDataLoading,
  //   refetch: refetchMemoryUtilizationData,
  // } = GetMemoryUtilization({
  //   key: trigger,
  //   payload: requiredPayload,
  //   enabled: Object.keys(requiredPayload).length !== 0,
  // });

  // const {
  //   data: CpuTemperatureData,
  //   isLoading: isCpuTemperatureDataLoading,
  //   refetch: refetchCpuTemperatureData,
  // } = GetCpuTemperature({
  //   key: trigger,
  //   payload: requiredPayload,
  //   enabled: Object.keys(requiredPayload).length !== 0,
  // });

  // const {
  //   data: FanSpeedData,
  //   isLoading: isFanSpeedDataLoading,
  //   refetch: refetchFanSpeedData,
  // } = GetFanSpeed({
  //   key: trigger,
  //   payload: requiredPayload,
  //   enabled: Object.keys(requiredPayload).length !== 0,
  // });

  // const {
  //   data: PsuTemperatureData,
  //   isLoading: isPsuTemperatureDataLoading,
  //   refetch: refetchPsuTemperatureData,
  // } = GetPsuTemperature({
  //   key: trigger,
  //   payload: requiredPayload,
  //   enabled: Object.keys(requiredPayload).length !== 0,
  // });

  // const {
  //   data: PsuVoltageData,
  //   isLoading: isPsuVoltageDataLoading,
  //   refetch: refetchPsuVoltageData,
  // } = GetPsuVoltage({
  //   key: trigger,
  //   payload: requiredPayload,
  //   enabled: Object.keys(requiredPayload).length !== 0,
  // });

  // const {
  //   data: PsuCurrentData,
  //   isLoading: isPsuCurrentDataLoading,
  //   refetch: refetchPsuCurrentData,
  // } = GetPsuCurrent({
  //   key: trigger,
  //   payload: requiredPayload,
  //   enabled: Object.keys(requiredPayload).length !== 0,
  // });

  // const {
  //   data: PsuPowerData,
  //   isLoading: isPsuPowerDataLoading,
  //   refetch: refetchPsuPowerData,
  // } = GetPsuPower({
  //   key: trigger,
  //   payload: requiredPayload,
  //   enabled: Object.keys(requiredPayload).length !== 0,
  // });

  // const {
  //   data: ServicesRunningListData,
  //   isLoading: isServicesRunningDataLoading,
  //   refetch: refetchServicesRunningListData,
  // } = GetServicesRunning({
  //   key: trigger,
  //   payload: requiredPayload,
  //   enabled: Object.keys(requiredPayload).length !== 0,
  // });

  // const {
  //   data: CpuConsumptionListData,
  //   isLoading: isCpuConsumptionListDataLoading,
  //   refetch: refetchCpuConsumptionListData,
  // } = GetCpuConsuptionData({
  //   key: trigger,
  //   payload: requiredPayload,
  //   enabled: Object.keys(requiredPayload).length !== 0,
  // });

  // const {
  //   data: MemoryConsumptionListData,
  //   isLoading: isMemoryConsumptionListDataLoading,
  //   refetch: refetchMemoryConsumptionListData,
  // } = GetMemoryConsuptionData({
  //   key: trigger,
  //   payload: requiredPayload,
  //   enabled: Object.keys(requiredPayload).length !== 0,
  // });

  // const {
  //   data: {
  //     cpuUtil: CpuUtilizationData,
  //     memUtil: MemoryUtilizationData,
  //     cpuTemp: CpuTemperatureData,
  //     fanSpeed: FanSpeedData,
  //     psuTemp: PsuTemperatureData,
  //     psuVolt: PsuVoltageData,
  //     psuCurr: PsuCurrentData,
  //     psuPow: PsuPowerData,
  //     serv: ServicesRunningListData,
  //     cpuConsump: CpuConsumptionListData,
  //     memConsump: MemoryConsumptionListData,
  //     devInfo: deviceInfoData,
  //   } = {},
  //   refetch: refetchData,
  //   isLoading,
  // } = GetMegeHealthInfo({
  //   key: trigger,
  //   payload: requiredPayload,
  //   enabled: Object.keys(requiredPayload).length !== 0,
  // });
  //queries end

  // const isLoading =
  // !CpuUtilizationData ||
  //   !MemoryUtilizationData ||
  //   !CpuTemperatureData ||
  //   !FanSpeedData ||
  //   !PsuTemperatureData ||
  //   !PsuVoltageData ||
  //   !PsuCurrentData ||
  //   !PsuPowerData ||
  //   !ServicesRunningListData ||
  //   !CpuConsumptionListData ||
  //   !MemoryConsumptionListData;

  const isLoading = false;
  // console.log({state});

  React.useEffect(() => {
    let payload = {
      fromDate: moment
        .utc(new Date())
        .subtract(1, 'h')
        .format('YYYY-MM-DD HH:mm:ss'),
      toDate: moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      macAddress: id,
    };
    setRequiredPayload(payload);
  }, []);

  const startInterval = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      // console.log(' calling refetch');
      refetchAllData();
      scheduleReRender();
      // setTimeout(() => setReRenderTrigger((val) => val + 1), 5000);
    }, 10000);
  };

  const scheduleReRender = () => {
    setTimeout(() => setReRenderTrigger((val) => val + 1), 1000);
  };

  const refetchAllData = () => {
    // refetchData();

    //
    setState(genState());
    // refetchCpuUtilizationData();
    // refetchMemoryUtilizationData();
    // refetchCpuTemperatureData();
    // refetchFanSpeedData();
    // refetchPsuTemperatureData();
    // refetchPsuPowerData();
    // refetchPsuCurrentData();
    // refetchPsuVoltageData();
    // refetchServicesRunningListData();
    // refetchCpuConsumptionListData();
    // refetchMemoryConsumptionListData();
    // refetchDeviceInfoData();
  };
  React.useEffect(() => {
    if (
      requiredPayload !== undefined &&
      Object.keys(requiredPayload).length !== 0
    ) {
      refetchAllData();
    }
  }, [requiredPayload]);

  // React.useEffect(() => {
  //   if (
  //     deviceInfoData !== undefined &&
  //     deviceInfoData?.hostname !== undefined
  //   ) {
  //     dispatch(storeDeviceName(deviceInfoData?.hostname));
  //     setDeviceDetails(deviceInfoData);
  //   }
  // }, [deviceInfoData]);

  //refresh functionality
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
      // {
      //   headerData: {
      //     title: 'Services Running',
      //     subTitle: 'For This Device',
      //   },
      //   data: ServicesRunningListData.map((item) => ({
      //     name: item.name,
      //     series: item.data,
      //   })),
      // },
      // {
      //   headerData: {
      //     title: 'CPU Consumption',
      //     subTitle: 'For This Device',
      //   },
      //   data: CpuConsumptionListData.map((item) => ({
      //     name: item.name,
      //     series: item.data,
      //   })),
      // },
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
          <ChartGroup
            refreshTrigger={reRenderTrigger}
            baseOptions={buildOps()}
          />
        )}
      </div>
    </>
  );
}
