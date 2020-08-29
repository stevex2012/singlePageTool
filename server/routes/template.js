var express = require('express');
var router = express.Router();

var url = require('url');

const templates = require("../dao/templates")

const { 
    getTemplatesList,
    searchTemplates,
    creatTemplates,
    reNameTemplates,
    deleteTemplates 
} =  templates;


//获取方案内容
router.get('/list', function(req, res, next) {
    console.log('获取方案内容');
    var urlObj = url.parse(req.url, true);
    var id = urlObj.query.id;
    var page = urlObj.query.page ? parseInt(urlObj.query.page) : 1;
    var per_page = urlObj.query.per_page ? parseInt(urlObj.query.per_page) : 10;

    getTemplatesList({
        id,
        page,
        per_page
    }).then((arg)=>{
        res.write(JSON.stringify({
            error:0,
            message:'',
            data:arg
        }));
        res.end();
    },(err)=>{
        res.write(JSON.stringify({
            error:1,
            message:err,
            data:{}
        }));
        res.end();
    })

});

//搜索方案内容
router.get('/search', function(req, res, next) {

    var urlObj = url.parse(req.url, true);
    var search = urlObj.query.search;
    var page = urlObj.query.page ? parseInt(urlObj.query.page) : 1;
    var per_page = urlObj.query.per_page ? parseInt(urlObj.query.per_page) : 10;

    console.log('搜索方案内容',search);
    searchTemplates({
        search,
        page,
        per_page
    }).then((arg)=>{
        res.write(JSON.stringify({
            error:0,
            message:'',
            data:arg
        }));
        res.end();
    },(err)=>{
        res.write(JSON.stringify({
            error:1,
            message:err,
            data:{}
        }));
        res.end();
    })

});

router.post('/', function(req, res, next) {
    const {name} = req.body;
    creatTemplates({name}).then((arg)=>{
        res.write(JSON.stringify(
            {
                error:0,
                message:'',
                data:arg.dataValues
            }
        ));
        res.end();
    },(err)=>{
        res.write(JSON.stringify({
            error:1,
            message:err,
            data:{}
        }));
        res.end();
    })
});


//重命名
router.put('/', function(req, res, next) {
    const {name,id} = req.body;
    console.log('重命名',name);

    reNameTemplates({name,id}).then((arg)=>{
        res.write(JSON.stringify(
            {
                error:0,
                message:'',
                data:{}
            }
        ));
        res.end();
    },(err)=>{
        res.write(JSON.stringify({
            error:1,
            message:err,
            data:{}
        }));
        res.end();
    })
});

//删除某个方案
router.delete('/', function(req, res, next) {

    var urlObj = url.parse(req.url, true);
    var id = urlObj.query.id;
    
    console.log('删除某个方案',id);

    deleteTemplates({id}).then((arg)=>{
        res.write(JSON.stringify(
            {
                error:0,
                message:'',
                data:{}
            }
        ));
        res.end();
    },(err)=>{
        res.write(JSON.stringify({
            error:1,
            message:err,
            data:{}
        }));
        res.end();
    })
});



module.exports = router;
