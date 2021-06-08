const { select } = require('async');
var express = require('express');
var router = express.Router();
var data=require('../config/config');

router.get('/',(req,res,next)=>{
    res.render('admin/types-input')
})
 router.post('/add',(req,res,next)=>{
      data.db.query("insert into classify (sort_id,sort_name) value(?,?)",[req.body.sort_id],[req.body.sort_name],(err,results)=>{
          if(err!=null){
              console.log(err)
          }else{
            console.log(result);
          }
      })
      res.redirect('admin/types')
 })

module.exports = router;