const select  = require('async');
var express = require('express');
var router = express.Router();
var data=require('../config/config');
var sd = require('silly-datetime');

router.get('/',(req,res,next)=>{
    res.render('admin/friendlinks-input')
})
 router.post('/add',(req,res,next)=>{
     let datas,m;
     data.db.query("select use_id from user where use_name=?",[req.session.usename],(err,results)=>{
         if(err !=null){
             console.log(err)
         }else{
             m=results
  data.db.query("select max(id) as id from user_friends UNION ALL SELECT user_friends.use_friends_id as fid FROM user_friends WHERE use_id=?",[m[0].use_id],(err,results)=>{
         if(err!=null){
             console.log(err)
         }else{
            let nowTime = sd.format(new Date())
             console.log(results[0].id);
            datas=results;
    data.db.query("insert into user_friends(id,use_friends_name,use_add_time,use_id,use_friends_id,use_friends_email) value(?,?,?,?,?,?)",[datas[0].id+1,req.body.blogname,nowTime,m[0].use_id,datas[0].fid+1,req.body.blogemail],(err,results)=>{
          if(err!=null){
              console.log(err)
          }else{
            console.log(results);
            res.redirect('/admin/types')
          }
        })
        }
        })

         }
     })
   
        });
module.exports = router;