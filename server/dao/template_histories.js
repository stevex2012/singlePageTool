/**
 * 
 * 方案详情操作
 * 
 */
const dao = require('./dao');
const { Op } = require("sequelize");
const { Models } = dao

const { Template_histories } = Models

//创建方案记录
const creatTemplatesHistory = ({template_id,component_json})=>{
    return Template_histories.create({
        template_id,
        component_json,
        create_time:new Date()
    });
}

//插入打包内容
const insertHtmlTemplatesHistory = ({id,html_content})=>{
    return Template_histories.update({html_content},{
        where:{
            id:id
        }
    });
    
}

//获取方案详细信息
const getTemplateInfo = ({template_id})=>{
    return Template_histories.findOne({
        where:{
            is_delete:0,
            template_id
        },
        order:[['create_time','DESC']]
    });
}


module.exports = {
    creatTemplatesHistory,
    insertHtmlTemplatesHistory,
    getTemplateInfo
}