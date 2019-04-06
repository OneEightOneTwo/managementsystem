const express = require('express');
const router = express.Router();
const db = require('../mongodb/db');
const url = require('url');


//通过参数来选择查询2019-04-03

router.get('/statistics', function (req, res) {
  db.select('staitistics',{'date':'2019-04-03'},(data)=>{
    res.send(data);
  })
});

router.get('/echart', function (req, res) {
  db.select('echarts',{},(data)=>{
    res.send(data);
  })
});



module.exports = router;