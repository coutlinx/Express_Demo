const select  = require('async');
var express = require('express');
var router = express.Router();
var data=require('../config/config');


router.get('/',(req,res,next)=>{
    data.HasSession(req,res);
    res.render('admin/types-input')
})
 router.post('/add',(req,res,next)=>{
     data.db.query("select max(id) as id from classify",(err,results)=>{
         if(err!=null){
             console.log(err)
         }else{
             console.log(results[0].id);
             let datas=results;
        data.db.query("select sort_name from classify where sort_name=?",[req.body.sort_name],(err,results)=>{
            if(err!=null){
                console.log(err)
            }else{
                if (results!=""){
                    res.json({status:"您要添加的分类重复"});
                }else{
                        data.db.query("insert into classify(id,sort_name) value(?,?)",[results[0].id+1,req.body.sort_name],(err,results)=>{
          if(err!=null){
              console.log(err)
          }else{
            console.log(results);
            res.redirect('/admin/types')
          }
        })
                }
            }
        })

        }
        })
        });
module.exports = router;