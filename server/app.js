var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var templateRouter = require('./routes/template');
var templateHistoryRouter = require('./routes/templateHistory');
var templatePackageRouter = require('./routes/templatePackage');
const { createProxyMiddleware } = require('http-proxy-middleware');
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.engine('.html', require('ejs').__express);
// app.set('view engine', 'html');


app.use(logger('dev'));

//代理接口请求
app.use('/remoteapi', createProxyMiddleware({
  target: 'https://test.fmootech.cn',
  changeOrigin: true,
  secure: false,
  headers: {
    "Connection": "keep-alive"
  },
}))
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

//api路由
// app.use('/', indexRouter);
// app.use('/', express.static('../client/build/index.html'));
app.use('/template', templateRouter); //方案列表信息
app.use('/template/history', templateHistoryRouter); //历史记录
app.use('/template/package', templatePackageRouter); //打包

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
