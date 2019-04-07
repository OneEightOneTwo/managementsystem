var express = require('express');
var router = express.Router();
const db = require('../mongodb/db')
const url = require('url');
const querystring = require('querystring');

/* GET users listing. */
router.get('/product', function (req, res, next) {
  db.select('goodslist', {}, data => {
    let json = {
      code: 0,
      msg: "",
      count: data.dataset.length,
      data: data.dataset
    }
    res.send(json);
  })

});

router.post('/remove', function (req, res, next) {
  let {
    id
  } = req.body;
  // console.log('请求');
  // console.log(req.body);
  console.log(id);
  db.remove('goodslist', {"id": `${id}`}, data => {
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
router.post('/insert', function (req, res, next) {
  let {
    id
  } = req.body;
  // console.log('请求');
  // console.log(req.body);
  console.log(id);
  db.insert('goodslist', {"id": `${id}`}, data => {
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