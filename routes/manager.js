var express = require('express');
var router = express.Router();
const db = require('../mongodb/db');

/* GET users listing. */
router.get('/manager', function (req, res, next) {
  db.select('managers', {}, data => {
    let jsons = {
      code: 0,
      msg: '',
      count: data.dataset.length,
      data: data.dataset,
    }
    res.send(jsons);
  })

});

module.exports = router;
