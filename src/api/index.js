import axios from "axios";

const baseUrl = "";
const options = {
  timeout: 20000,
};
const instance = axios.create(options);
const token = sessionStorage.getItem("token") || "";
/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    //如果存在token，请求携带这个token
    config.headers["Authorization"] = token;
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
    if (res.status)
      if (res.status.toString().startsWith("2")) return { data: res.data };
      else if (res.status.toString().startsWith("3"))
        return {
          message: "url已被重定向",
          data: res.data,
        };
      else if (res.status.toString().startsWith("4"))
        return {
          message: "请求错误！",
        };
      else if (res.status.toString().startsWith("5"))
        return {
          message: "服务器错误！无法完成请求",
        };
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
  return instance({
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
  return instance({
    method: "post",
    url: `${baseUrl}${url}`,
    data: params,
  });
};
export const putRequest = (url, params) => {
  return instance({
    method: "put",
    url: `${baseUrl}${url}`,
    data: params,
  });
};
export const deleteRequest = (url, params) => {
  return instance({
    method: "delete",
    url: `${baseUrl}${url}`,
    data: params,
  });
};
