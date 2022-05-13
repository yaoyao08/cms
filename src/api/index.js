import axios from "axios";

const baseUrl = "";
const options = {
  timeout: 5000,
  headers: {
    Authorization: window.sessionStorage.getItem("token") || "",
  },
};
const instance = axios.create(options);

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/**
 * get类型请求
 * @param {*} url
 * @param {*} params
 * @returns
 */
export const getRequest = (url, params) => {
  return axios({
    method: "get",
    url: `${baseUrl}${url}`,
    data: params,
  });
};
/**
 * post请求
 * @param {string} url
 * @param {*} params
 * @returns
 */
export const postRequest = (url, params) => {
  return axios({
    method: "post",
    url: `${baseUrl}${url}`,
    data: params,
  });
};
export const putRequest = (url, params) => {
  return axios({
    method: "put",
    url: `${baseUrl}${url}`,
    data: params,
  });
};
export const deleteRequest = (url, params) => {
  return axios({
    method: "delete",
    url: `${baseUrl}${url}`,
    data: params,
  });
};
