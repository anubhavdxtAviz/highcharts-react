import { useMutation, useQuery } from '@tanstack/react-query';
import axios from '../services/axios'
// import { appendAccess_token } from '../../util/util';
const appendAccess_token = (str) => str;
export const GetDeviceList = ({ key, filter }) => {
  const refreshInterval = 15;
  return useQuery(
    ['GetDeviceList', key],
    () => {
      let url = '/Health/DeviceList';
      if (Object.keys(filter).length !== 0) {
        url += `?filter=${JSON.stringify(filter)}`;
        url = appendAccess_token(url, true);
      } else url = appendAccess_token(url);
      return axios.request({
        method: 'GET',
        url,
      });
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: refreshInterval * 1000,
    }
  );
};

export const GetDeviceInfo = ({ key, payload, enabled }) => {
  return useQuery(
    ['GetDeviceInfo', key, payload],
    () => {
      let url = '/Health/deviceInfo';
      url += `?filter=${JSON.stringify(payload)}`;
      url = appendAccess_token(url, true);
      return axios.request({
        method: 'GET',
        url,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: enabled,
    }
  );
};

export const GetCpuUtilization = ({ key, payload, enabled }) => {
  return useQuery(
    ['GetCpuUtilization'],
    () => {
      let url = '/Health/cpuUtilizationofDevice';
      url += `?filter=${JSON.stringify(payload)}`;
      url = appendAccess_token(url, true);
      return axios.request({
        method: 'GET',
        url,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: enabled,
    }
  );
};

export const GetMemoryUtilization = ({ key, payload, enabled }) => {
  return useQuery(
    ['GetMemoryUtilization'],
    () => {
      let url = '/Health/memoryUtilizationofDevice';
      url += `?filter=${JSON.stringify(payload)}`;
      url = appendAccess_token(url, true);
      return axios.request({
        method: 'GET',
        url,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: enabled,
    }
  );
};

export const GetCpuTemperature = ({ key, payload, enabled }) => {
  return useQuery(
    ['GetCpuTemperature'],
    () => {
      let url = '/Health/coreCpuTemperature';
      url += `?filter=${JSON.stringify(payload)}`;
      url = appendAccess_token(url, true);
      return axios.request({
        method: 'GET',
        url,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: enabled,
    }
  );
};

export const GetFanSpeed = ({ key, payload, enabled }) => {
  return useQuery(
    ['GetFanSpeed'],
    () => {
      let url = '/Health/getFanSpeed';
      url += `?filter=${JSON.stringify(payload)}`;
      url = appendAccess_token(url, true);
      return axios.request({
        method: 'GET',
        url,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: enabled,
    }
  );
};

export const GetPsuTemperature = ({ key, payload, enabled }) => {
  return useQuery(
    ['GetPsuTemperature'],
    () => {
      let url = '/Health/getPsuTemp';
      url += `?filter=${JSON.stringify(payload)}`;
      url = appendAccess_token(url, true);
      return axios.request({
        method: 'GET',
        url,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: enabled,
    }
  );
};

export const GetPsuVoltage = ({ key, payload, enabled }) => {
  return useQuery(
    ['GetPsuVoltage'],
    () => {
      let url = '/Health/getPsuVoltage';
      url += `?filter=${JSON.stringify(payload)}`;
      url = appendAccess_token(url, true);
      return axios.request({
        method: 'GET',
        url,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: enabled,
    }
  );
};

export const GetPsuCurrent = ({ key, payload, enabled }) => {
  return useQuery(
    ['GetPsuCurrent'],
    () => {
      let url = '/Health/getPsuCurrent';
      url += `?filter=${JSON.stringify(payload)}`;
      url = appendAccess_token(url, true);
      return axios.request({
        method: 'GET',
        url,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: enabled,
    }
  );
};

export const GetPsuPower = ({ key, payload, enabled }) => {
  return useQuery(
    ['GetPsuPower'],
    () => {
      let url = '/Health/getPsuPower';
      url += `?filter=${JSON.stringify(payload)}`;
      url = appendAccess_token(url, true);
      return axios.request({
        method: 'GET',
        url,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: enabled,
    }
  );
};

export const GetServicesRunning = ({ key, payload, enabled }) => {
  return useQuery(
    ['GetServicesRunning'],
    () => {
      let url = '/Health/servicesOfDevice';
      url += `?filter=${JSON.stringify(payload)}`;
      url = appendAccess_token(url, true);
      return axios.request({
        method: 'GET',
        url,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: enabled,
    }
  );
};

export const GetCpuConsuptionData = ({ key, payload, enabled }) => {
  return useQuery(
    ['GetCpuConsuptionData'],
    () => {
      let url = '/Health/getCpuConsuptionData';
      url += `?filter=${JSON.stringify(payload)}`;
      url = appendAccess_token(url, true);
      return axios.request({
        method: 'GET',
        url,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: enabled,
    }
  );
};

export const GetMemoryConsuptionData = ({
  key,
  payload,
  enabled,
}) => {
  return useQuery(
    ['GetMemoryConsuptionData'],
    () => {
      let url = '/Health/getMemoryConsuptionData';
      url += `?filter=${JSON.stringify(payload)}`;
      url = appendAccess_token(url, true);
      return axios.request({
        method: 'GET',
        url,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: enabled,
    }
  );
};

export const GetMegeHealthInfo = ({ key, payload, enabled }) => {
  return useQuery(
    ['MegaHealthInfo', key],
    () => {
      let url = '/Health/mega';
      url += `?filter=${JSON.stringify(payload)}`;
      url = appendAccess_token(url, true);
      return axios.request({
        method: 'GET',
        url,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: enabled,
    }
  );
};
