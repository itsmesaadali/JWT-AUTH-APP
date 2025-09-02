import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.LOCAL_BACKEND_URL
    : process.env.PROD_BACKEND_URL;

axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  function (config) {
    console.log('sending request to backend', config.baseURL, 'and', config.url)
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    console.log('Receving request  to backend', response.data)

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
