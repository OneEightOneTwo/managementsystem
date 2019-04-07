const express = require('express');
const router = express.Router();
const db = require('../mongodb/db-asyncv2');
const url = require('url');


//通过参数来选择查询2019-04-03

router.get('/statistics', async (req, res) => {
  try {
    let result = await db.select('staitistics', {
      'date': '2019-04-03'
    });
    res.send(result);
    // db.select('staitistics', {
    //   'date': '2019-04-03'
    // }, (data) => {
    //   res.send(data);
    // })
  } catch (err) {
    throw err
  }

});

router.get('/echart', async (req, res) => {
  try {
    let result = await db.select('echarts', {});
    res.send(result);
  } catch (err) {
    throw err
  }

  // db.select('echarts', {}, (data) => {
  //   res.send(data);
  // })
});



module.exports = router;