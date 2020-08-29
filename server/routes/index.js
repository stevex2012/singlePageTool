var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  // fs.readFile('../client/build/index.html',(err,file)=>{
  //   if(err) throw err;
  //   res.set('Content-Type', 'text/html')
  //   res.send(file);
  // })
  res.render('index', { title: 'Express' });
});

module.exports = router;
