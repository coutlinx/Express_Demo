var express = require('express');
var config = require('../config/config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  config.db.query("select * from message_board inner join user on message_board.use_id = user.use_id",(err,result,fild)=>{
    if(err != null){
      console.log(err);
    }else{
      console.log(result)
    }
  })
  res.render('message');
});

module.exports = router;
