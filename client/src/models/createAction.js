import {axiosGet,axiosPost} from './config/axiosCore';
import {TEMPLATE_HISTORY,EXPORT_DATA,TEMPLATE_PACKAGE } from './config/api';
//保存方案 template_id,component_json
/**
 * 
 * @param {*} data {template_id,component_json}
 */
function savePageData(data = {}){
    return axiosPost(TEMPLATE_HISTORY,{
        ...data
    });
}


//保存并打包方案 template_id,component_json
/**
 * 
 * @param {*} data {template_id,component_json}
 */
function saveAndPackagePageData(data = {}){
    return axiosPost(TEMPLATE_PACKAGE,{
        ...data
    });
}

// 获取方案详情
function getPageDetail(template_id){
    return axiosGet(TEMPLATE_HISTORY,{template_id});
}
//导出方案 
/**
 * 
 * @param {number | string} template_id 
 */
function exportPageHtml(template_id){
    return axiosPost(EXPORT_DATA,{
        template_id
    })
}
export {
    savePageData,
    getPageDetail,
    exportPageHtml,
    saveAndPackagePageData
}