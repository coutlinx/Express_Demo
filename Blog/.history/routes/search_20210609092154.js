var express = require('express');
var config = require('../config/config')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('search');
});
router.post('/',(req,res)=>{
  console.log(req.body.query)
  
})
module.exports = router;
