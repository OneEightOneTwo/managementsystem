var express = require('express');
var router = express.Router();
const db = require('../mongodb/db')
/* GET users listing. */
router.get('/product', function(req, res, next) {
  db.select('goodslist',{},data=>{
    let json = {
      code:0,
      msg:"",
      count:data.dataset.length,
      data:data.dataset
    }
    res.send(json);
  })
 
});


module.exports = router;
