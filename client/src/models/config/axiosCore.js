import axios from 'axios';
import { setQueryString } from '../../utils/helps';
const { REACT_APP_BASE_URL} = process.env;
// const hostName = 'http://192.168.2.165:3001/'; // 服务器地址
const hostName = REACT_APP_BASE_URL; // 服务器地址
const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};


const instance = axios.create({
    baseURL: hostName,
    timeout: 35000, // 超时时间
    headers: headers
});
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
/**
 * get方法
 *
 * @export
 * @param {any} url
 * @param {any} [params={}]
 * @returns
 */
export function axiosGet(url, params) {

    return new Promise((resolve, reject) => {
        instance
            .get(`${url}${setQueryString(params)}`)
            .then(function (response) {
                const data = response.data;
                parseData(data, resolve, reject);
            })
            .catch(function (error) {
                parseError(error, reject);
            });
    });
}

/**
 * post方法
 *
 * @export
 * @param {any} url
 * @param {any} [params={}]
 * @returns
 */
export async function axiosPost(url, params) {
    return new Promise((resolve, reject) => {
        instance
            .post(url, params)
            .then(function (response) {
                const data = response.data;
                parseData(data, resolve, reject);
            })
            .catch(function (error) {
                parseError(error, reject);
            });
    });
}

/**
 * delete方法
 *
 * @export
 * @param {any} url
 * @param {any} [params={}]
 * @returns
 */
export async function axiosDelete(url, params) {
    return new Promise((resolve, reject) => {
        instance
            .delete(`${url}${setQueryString(params)}`)
            .then(function (response) {
                const data = response.data;
                parseData(data, resolve, reject);
            })
            .catch(function (error) {
                parseError(error, reject);
            });
    });
}

/**
 * put方法
 *
 * @export
 * @param {any} url
 * @param {any} [params={}]
 * @returns
 */
export async function axiosPut(url, params) {
    return new Promise((resolve, reject) => {
        instance
            .put(url, params)
            .then(function (response) {
                const data = response.data;
                parseData(data, resolve, reject);
            })
            .catch(function (error) {
                parseError(error, reject);
            });
    });
}
/**
 * pushImg方法
 *
 * @export
 * @param {any} url
 * @param {any} [params={}]
 * @returns
 */

export function axiosPushImg(url, params) {
    const instance1 = axios.create({
        withCredentials: true,
        baseURL: hostName,
        timeout: 35000 // 超时时间
    });
    return new Promise((resolve, reject) => {
        instance1
            .post(url, params)
            .then(function (response) {
                const data = response.data;
                parseData(data, resolve, reject);
            })
            .catch(function (error) {
                parseError(error, reject);
            });
    });
}
/**
 * 统一处理异步请求返回的数据
 * 判断code
 * 有token失效、逻辑性错误等
 *
 * @param {any} res
 * @param {any} isReturnAll 返回所有数据，不作code0/1校验
 */
async function parseData(res, resolve, reject) {
    const error = res.error;
    const data = res.data;
    switch (error) {
        case 0:// 请求成功
            resolve(data); // 返回所有数据(根据code进行判断是否有数据然后再数据处理)
            break;
        default:
            reject(res.message);
            break;
    }
}

/**
 * 解析特殊性错误
 * 例如请求超时等等
 * TODO: 请求超时后重发或其它处理
 *
 * @param {any} error
 * @param {any} reject
 */
function parseError(error, reject) {
    const message =
        error.message.indexOf('timeout') === -1 ? error.message : 'timeout';
    let tipMessage = ``;
    switch (message) {
        case 'timeout':
            tipMessage = `请求超时`;
            break;
        case 'Network Error':
            tipMessage = `亲，出了点问题，请再试一次`;
            break;
        default:
            tipMessage = error.message;
            break;
    }

    reject(tipMessage);
}
