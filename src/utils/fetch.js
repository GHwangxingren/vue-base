import axios from "axios";

/**
 * @description 创建axios实例
 * @param baseURL 基础url，会在请求url中自动添加前置链接
 * @param timeout 请求超时时间
 */
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000 * 8
});
/**
 * @description 请求拦截器
 * 用于处理请求前添加loading、判断是否已保存token，并在每次请求头部添加token
 */
service.interceptors.request.use(
  config => {
    // 对axios参数进行一些操作
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

/**
 * @description 响应拦截器
 * 用于处理loading状态关闭、请求成功回调、响应错误处理
 */
service.interceptors.response.use(
  response => {
    const data = response.data;
    // 全局处理返回码
    if (data.code === 3001) {
      // location.href = 'http://boss.huixiaoer.com'
    }
    return data;
  },
  error => {
    if (error.response) {
      // switch (error.response.status) {
      //   case 401:
      //     console.log("401");
      //     // 登录拦截
      //     break;
      //   case 404:
      //     // Toast('请求资源不存在')
      //     break;
      //   default:
      //     break;
      //   // Toast(error.response.data.message)
      // }
    } else {
      // 请求超时活网络有问题
      if (error.message.includes("timeout")) {
        // Toast('请求超时！请检查网络是否正常')
      } else {
        // Toast('请求失败，请检查网络是否已连接')
      }
    }
    return Promise.reject(error);
  }
);

export default service;
