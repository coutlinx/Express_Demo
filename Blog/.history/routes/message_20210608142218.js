var express = require('express');
var config = require('../config/config');
var sd = require('silly-datetime');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  config.HasSession();
  config.db.query("select * from message_board inner join user on message_board.use_id = user.use_id",(err,result,fild)=>{
    if(err != null){
      console.log(err);
    }else{
      console.log(result);
      let date = []
      let names = []
      let content = [];
      let icon = [];
      for(let i of result){
        date.push(sd.format(i.comment_date,"HH:mm"))
        names.push(i.use_name);
        content.push(i.comment_content);
        icon.push(i.icon);
      }
      res.render('message',{data:result,time:date,name:names,icon:icon,content:content});
    }
  })
});
router.post('/push',(req,res)=>{
  console.log(req.body.content);
  let now = sd.format(new Date(), "YYYY-MM-DD HH:mm");
  config.db.query("select use_id from user where use_name = ?",[req.session.user.name],(err,result,fild)=>{
    if(err!= null){
      console.log(err)
    }else{
      let id = result[0].use_id;
      config.db.query("insert into message_board(use_id,comment_date,comment_content) value(?,?,?)",[id,now,req.body.content],(err,result,fild)=>{
        if(err!=null){
          console.log(err);
        }else{
          console.log(result);
        }
      })
    }
  })
})
module.exports = router;
