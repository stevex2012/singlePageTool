var express = require('express');
var router = express.Router();


const { saveAndPackageTemplate } = require('../lib/createTemplate')

//创建并打包方案
router.post('/', function(req, res, next) {
  const {template_id,component_json} = req.body;

  saveAndPackageTemplate({template_id,component_json}).then((arg)=>{
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
