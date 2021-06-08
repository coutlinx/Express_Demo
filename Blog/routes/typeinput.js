const { select } = require('async');
var express = require('express');
var router = express.Router();
var data=require('../config/config');

router.get('/',(req,res,next)=>{
    res.render('admin/types-input')
})
 router.post('/add',(req,res,next)=>{
     data.db.query("select max(id) as id from classify",(err,results)=>{
         if(err!=null){
             console.log(err)
         }else{
             console.log(results[0].id);
             let datas=results;
    data.db.query("insert into classify(id,sort_name) value(?,?)",[results[0].id+1,req.body.sort_name],(err,results)=>{
          if(err!=null){
              console.log(err)
          }else{
            console.log(results);
            res.redirect('/admin/types')
          }
        })
        }
        })
        });
module.exports = router;