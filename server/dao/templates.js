/**
 * 
 * 方案列表操作
 * 
 */

const dao = require('./dao');
const { Op } = require("sequelize");

const { Models } = dao

const { Templates } = Models

//获取方案内容列表
const getTemplatesList = async ({page = 1,per_page = 10 })=>{
    const amount = await Templates.count({
        where: {
            is_delete: 0
        }
    });

    const List = await Templates.findAll({
        attributes:['id','name','create_time','update_time'],
        where: {
          is_delete: 0
        },
        order:[['update_time','DESC']],
        offset:(page - 1) * per_page,
        limit:per_page
    });

    return {
        list:List,
        pagination:{
            total:amount,
            current_page:page,
            per_page:per_page
        }
    }
}

//搜索方案内容
const searchTemplates = async ({search,page = 1,per_page = 10})=>{

    const amount = await Templates.count({
        where: {
            is_delete: 0,
            name:{
                [Op.like]:`%${search}%`
            }
        }
    });

    const List = await Templates.findAll({
        attributes:['id','name','create_time','update_time'],
        where: {
          is_delete: 0,
          name:{
            [Op.like]:`%${search}%`
          }
        },
        order:[['update_time','DESC']],
        offset:(page - 1) * per_page,
        limit:per_page
    });

    return {
        list:List,
        pagination:{
            total:amount,
            current_page:page,
            per_page:per_page
        }
    }
}

//创建方案
const creatTemplates = (arg)=>{
    return Templates.create({
        name:arg.name,
        create_time:new Date(),
        update_time:new Date()
    });
}

//重命名
const reNameTemplates = ({id,name})=>{
    return Templates.update({name:name},{
        where:{
            is_delete:0,
            id:id 
        }
    });
}


//更新创建时间
const reUpdateTimeTemplates = ({id})=>{
    return Templates.update({update_time:new Date()},{
        where:{
            is_delete:0,
            id:id 
        }
    });
}


//逻辑删除某个方案
const deleteTemplates = ({id})=>{
    return Templates.update({is_delete:1},{
        where:{
            id:id 
        }
    });
}

module.exports = {
    getTemplatesList,
    searchTemplates,
    creatTemplates,
    reNameTemplates,
    deleteTemplates,
    reUpdateTimeTemplates
  }