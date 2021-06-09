var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('search');
});
router.post('/',(req,res)=>{
  console.log(req.body)
  res.render("index");
})
module.exports = router;
