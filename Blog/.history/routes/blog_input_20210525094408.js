var express = require('express');
var TIME = require('silly-datetime');
const config = require('../config/config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.MD !=undefined){
    res.render('admin/blogs-input',{MD:req.session.MD});
  }else{
    res.render('admin/blogs-input',{MD:""});
  }
});
router.post('/',(req,res)=>{
  console.log(req.body);
  let now = 
  config.db.query("select use_id from user where use_name = ?",[req.session.user.name],(err,results,fil)=>{
    if(err!=null){
      console.log(err)
    }else{
      let id = results[0].use_id;
      config.db.query("insert into essay (use_id,article_title,article_content,article_date,article_photo,article_md,article_html,article_classify,article_status,article_recommend) value(?,?,?,?,?,?,?,?,?,?)",[
        id,
        req.body.title,
        req.body.description,
        
      ])
    }
  })
})
module.exports = router;