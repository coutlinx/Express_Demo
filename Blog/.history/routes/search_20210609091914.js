var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('search');
});
router.post('/',(req,res)=>{
  res.render("index");
})
module.exports = router;
