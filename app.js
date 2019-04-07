var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//首页仪表盘
app.use('/', require('./routes/index'));
//网站用户路由
app.use('/users', require('./routes/users'));
// 删除用户 对应ID功能的路由
app.use('/delUser', require('./routes/delUser'));
// 删除管理员 对应ID功能的路由
app.use('/delManager', require('./routes/delManager'));
// 添加后台管理员 对应ID功能的路由
app.use('/addManager', require('./routes/addManager'));
//管理员路由
app.use('/manager', require('./routes/manager'));
//商品路由
app.use('/product', require('./routes/product'));
//添加商品路由
app.use('/addgoods', require('./routes/addgoods'));
//订单管理
app.use('/order', require('./routes/order'));

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
