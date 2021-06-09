var express = require('express');
var config = require('../config/config')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('search');
});
router.post('/',(req,res)=>{
  console.log(req.body.query)
  config.db.query("select count(*) num from essay",(err,results,fild)=>{
    if(err!=null){
      console.log(err)
    }else{
      let num = results[0]
      console.log(num);
    }
  })
})
module.exports = router;
