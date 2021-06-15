const select  = require('async');
var express = require('express');
const config = require('../config/config');
var router = express.Router();
var data=require('../config/config');


router.get('/',(req,res,next)=>{
<<<<<<< HEAD
    config.HasSession(req,res);
    config.IsAdmin(req,res);   
        res.render('admin/types-input')
    
=======
    data.HasSession(req,res);
    res.render('admin/types-input')
>>>>>>> 086e1a66bcf96bfd7ba4e5ede8b07f35432765ac
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