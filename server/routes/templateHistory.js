var express = require('express');
var router = express.Router();


var url = require('url');

const { saveTemplate } = require('../lib/createTemplate')

const Templates = require('.././dao/template_histories')

const { getTemplateInfo } = Templates

//获取方案详情
router.get('/', function(req, res, next) {
  console.log('获取方案详情');
  var urlObj = url.parse(req.url, true);
  var template_id = urlObj.query.template_id;

  getTemplateInfo({template_id}).then((arg)=>{
    res.write(JSON.stringify(
      {
        error:0,
        message:'',
        data:arg
      }
    ));
    res.end();
  }).catch((e)=>{
    res.write(JSON.stringify(
      {
        error:1,
        message:e.message,
        data:{}
      }
    ));
    res.end();
  })
});


//创建方案
router.post('/', function(req, res, next) {
  const {template_id,component_json} = req.body;

  saveTemplate({template_id,component_json}).then((arg)=>{
    res.write(JSON.stringify(
      {
        error:0,
        message:'',
        data:arg
      }
    ));
    res.end();
  }).catch((e)=>{
    res.write(JSON.stringify(
      {
        error:1,
        message:e.message,
        data:{}
      }
    ));
    res.end();
  })
});

module.exports = router;
