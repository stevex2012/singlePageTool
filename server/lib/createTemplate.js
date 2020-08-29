/**
 * 
 * 生成一条方案的记录，同时打包
 * 
 */

const templateHistory = require('../dao/template_histories')
const templates = require('../dao/templates')
const packaging = require('./packaging')

const {
  creatTemplatesHistory,
  insertHtmlTemplatesHistory
} = templateHistory

const { reUpdateTimeTemplates } = templates


const saveTemplate = async ({template_id,component_json})=>{

    if(!template_id || !component_json){
        throw new Error(`缺少必须参数,template_id:${template_id}或者component_json:${component_json}`)
    }

    const templateInfo = await creatTemplatesHistory({template_id,component_json:JSON.parse(component_json)})

    if(!templateInfo){
        throw new Error(`创建方案信息失败`)
    }
    const _templateInfo = templateInfo.dataValues

    //更新方案最后更改时间
    reUpdateTimeTemplates({id:template_id})

    return {..._templateInfo}
}


const saveAndPackageTemplate = async ({template_id,component_json})=>{

    if(!template_id || !component_json){
        throw new Error(`缺少必须参数,template_id:${template_id}或者component_json:${component_json}`)
    }

    const templateInfo = await creatTemplatesHistory({template_id,component_json:JSON.parse(component_json)})

    if(!templateInfo){
        throw new Error(`创建方案信息失败`)
    }
    const _templateInfo = templateInfo.dataValues
    const content = await packaging(component_json)

    if(!content){
        throw new Error(`打包失败`)
    }


    insertHtmlTemplatesHistory({id:_templateInfo.id,html_content:content})
    //更新方案最后更改时间
    reUpdateTimeTemplates({id:template_id})

    return {..._templateInfo,html_content:content}
}

module.exports = {
    saveTemplate,
    saveAndPackageTemplate
};