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
      let date,names,content,icon = [];
      for(let i of result){
        date.push(sd.format(i.comment_date,"HH:mm"))
        names.push(i.use_name);
        content.push(i.comment_content);
        icon.push(i.icon)
      }
      console.log(date);
    }
  })
  res.render('message',{time:date,name:names,icon:icon});
});

module.exports = router;
