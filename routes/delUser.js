var express = require('express');
var router = express.Router();
const db = require('../mongodb/db');

// 处理前端发送过来要删除的ID信息，在数据库里面该对应id的记录，并且响应结果
router.post('/delUser', function (req, res, next) {
  let {
    id
  } = req.body;
  // console.log('请求');
  // console.log(req.body);
  console.log(id);
  db.remove('users', { "id": `${id}` }, data => {
    console.log(data);
    // let json = {
    //   code: 0,
    //   msg: "",
    //   count: data.dataset.length,
    //   data: data.dataset
    // }
    res.send(data);
  })

});


module.exports = router;