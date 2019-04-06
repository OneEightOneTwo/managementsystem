var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var checkToken = require('./routes/checkToken');
var compression = require('compression');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
//解析cookie
app.use(cookieParser());
//开启gzip压缩
app.use(compression());
//用户token验证
app.use(checkToken());
//静态文件，并配置缓存时间,etag:文件的hash值来判断文件是否改变，用来
app.use(express.static(path.join(__dirname, 'public'),{maxAge:60*60*1000}));

//首页仪表盘
app.use('/index', require('./routes/index'));
//用户路由
app.use('/users', require('./routes/users'));
//管理员路由
app.use('/manager', require('./routes/manager'));
//商品路由
app.use('/product', require('./routes/product'));
//订单管理
app.use('/order', require('./routes/order'));
//登录验证
app.use('/login', require('./routes/login'));

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