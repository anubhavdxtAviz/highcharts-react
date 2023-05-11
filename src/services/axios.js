import axios from 'axios';
// import store from '../redux/store';
// import { snackbarStatus } from '../slices/Reducer';
// import authAction from '../redux/actions/user';

//baseURL: "http://192.168.1.96:3001/api"
//const baseURL = 'http://10.2.2.10:3002/api';
// const baseURL = 'http://10.2.2.6:3002/';
//const baseURL = 'http://10.2.2.7:3002/';
// const baseURL = 'http://10.4.4.6:3002/api';
// const baseURL = 'http://10.1.1.11:3002/api';
//const baseURLApi = process.env.REACT_APP_API_URL;
// const baseURL = baseURLApi.slice(0, -4);
const baseURL = 'http://localhost:3002/';
// const baseURL = '/';

const axiosInstance = axios.create({
  baseURL: baseURL + 'api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.status > 200) {
      let tempMsg = response?.message;
      if (tempMsg && typeof tempMsg == 'object') {
        tempMsg = tempMsg.message || 'Unknown API error';
      }
      // store.dispatch(authAction.apiError({ message: tempMsg }));
      // store.dispatch(
      //   snackbarStatus({ message: tempMsg, severity: 'error' })
      // );
    } else {
      return response.data;
    }
  },
  (error) => {
    // console.log({error:error.response.data.error.message});
    const message = error?.response?.data?.error?.message;
    if (error) {
      if (error.message.includes('timeout of')) {
        // store.dispatch(
        //   snackbarStatus({
        //     message:
        //       'Sorry! It took longer than expected. Please try again.',
        //     severity: 'error',
        //   })
        // );
      } else if (error.message.includes('Network Error')) {
        // store.dispatch(
        //   snackbarStatus({
        //     message:
        //       'Network error. Please check your connection and retry',
        //     severity: 'error',
        //   })
        // authAction.apiError({
        //   message:
        //     'Network error. Please check your connection and retry.',
        // })
        // );
      } else {
        // store.dispatch(authAction.apiError(error));
        // store.dispatch(
        //   snackbarStatus({
        //     message: message,
        //     severity: 'error',
        //   })
        // );
      }
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem('authToken');
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOm51bGwsInVzZXJuYW1lIjoic3VwZXJhZG1pbiIsImZpcnN0bmFtZSI6IkF2aXoiLCJsYXN0bmFtZSI6IkFkbWluIiwibGFzdHNpZ25pbiI6IjIwMjMtMDUtMDRUMDc6NDQ6MTIuNzE4NjMyIiwicGFzc3dvcmRyZXNldG5lZWRlZCI6dHJ1ZSwicm9sZWlkIjoxLCJpc19hY3RpdmUiOnRydWUsInJvbGUiOnsiaWQiOjEsIm5hbWUiOiJzdXBlcmFkbWluIiwicnVuX3p0cCI6dHJ1ZSwiYXBpX2FjY2VzcyI6dHJ1ZSwiY3J1ZF91c2VycyI6dHJ1ZSwiZGV2aWNlX3NzaCI6dHJ1ZSwiaXNfZGVmYXVsdCI6ZmFsc2UsImRlc2NyaXB0aW9uIjoic3VwZXJhZG1pbiIsImNydWRfZGV2aWNlcyI6dHJ1ZSwicmVib290X2RldmljZSI6dHJ1ZSwiY3VzdG9taXplX3JvbGVzIjp0cnVlLCJjb25maWd1cmVfZGV2aWNlcyI6dHJ1ZSwiY3VzdG9taXplX3RocmVzaG9sZHMiOnRydWV9LCJpYXQiOjE2ODMxODg3OTF9.ByEaGfFaFxGVBsRd9suAlhqnR1Kld4EMZua8qtDluaw';
  if (token) config.headers.authorization = token;

  return config;
});

export default axiosInstance;
export { baseURL };
