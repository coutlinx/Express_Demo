const select  = require('async');
var express = require('express');
var router = express.Router();
var data=require('../config/config');
var sd = require('silly-datetime'); 

router.get('/',(req,res,next)=>{
    res.render('friendlinks-input')
})
 router.post('/add',(req,res,next)=>{
     let datas,m;
         console.log(req.session.usename)
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
            data.db.query("select use_email,use_name from user where use_email=? and use_name=?",[req.body.blogemail,req.body.blogname],(err,results)=>{
                if(err!=null){
                    console.log(err)
                }else{
                    if(results==""){
                        res.json({status:"您要添加的好友不存在"});
                        return;
                    }else{
                        console.log(m[0].use_id);
                        data.db.query("SELECT max(user_friends.use_friends_id) as id FROM user_friends WHERE use_id=?",[m[0].use_id],(err,results)=>{
                            if (err!=null){
                                console.log(err)
                            }else{
                                    let yue=results;
                                       data.db.query("insert into user_friends(id,use_friends_name,use_add_time,use_id,use_friends_id,use_friends_email) value(?,?,?,?,?,?)",[datas[0].id+1,req.body.blogname,nowTime,m[0].use_id,yue[0].id+1,req.body.blogemail],(err,results)=>{
                           if(err!=null){
                         console.log(err)
                             }else{
                           console.log(results);
                                 res.redirect('http://localhost:3000/friends-new')
                }
           }) 
                            }
                        })
          
                }
                }
            })
    
        }
        })
         }
     }) 
        });
module.exports = router;


