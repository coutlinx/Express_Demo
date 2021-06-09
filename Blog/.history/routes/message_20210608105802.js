var express = require('express');
var config = require('../config/config');
var sd = require('silly-datetime');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  config.db.query("select * from message_board inner join user on message_board.use_id = user.use_id",(err,result,fild)=>{
    if(err != null){
      console.log(err);
    }else{
      console.log(result);
      let date = [];
      for(let i of result){
        date.push(sd.format(i.comment_date,"HH:mm"))
      }
      console.log(date)
    }
  })
  res.render('message',{});
});

module.exports = router;
