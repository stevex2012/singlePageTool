import {  
    GET_TEMPLATE_LIST,
    TEMPLATE_SEARCH,
    TEMPLATE,
    TEMPLATE_HISTORY
 } from "./config/api";

 import { axiosGet,axiosPost,axiosPut,axiosDelete } from "./config/axiosCore";
 import { setQueryString } from '../utils/helps';


 //获取方案列表
 export function getTemplateList(params){
    return axiosGet(`${GET_TEMPLATE_LIST}${setQueryString(params)}`, null)
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    });
 }

 //搜索方案列表
 export function searchTemplate(params){
    return axiosGet(`${TEMPLATE_SEARCH}${setQueryString(params)}`, null)
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    });
 }

 //删除方案
 export function deleteTemplate(params){
    return axiosDelete(`${TEMPLATE}`, params)
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    });
 }


  //创建方案
  export function createTemplate(params){
    return axiosPost(`${TEMPLATE}`, params)
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    });
 }

//方案重命名
export function renameTemplate(params){
    return axiosPut(`${TEMPLATE}`, params)
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    });
 }


   //保存方案详情
   export function saveTemplateInfo(params){
    return axiosPost(`${TEMPLATE_HISTORY}`, params)
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    });
 }


//获取方案详情
export function getTemplateInfo(params){
    return axiosGet(`${TEMPLATE_HISTORY}${setQueryString(params)}`, null)
    .then(response => {
        return response;
    })
    .catch(error => {
        return error;
    });
 }