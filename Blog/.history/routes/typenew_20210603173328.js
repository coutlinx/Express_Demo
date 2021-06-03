var express = require('express');
var router = express.Router();
var data=require("../config/config");
var cookieParser = require('cookie-parser');
var session = require('express-session');

/* GET home page. */
router.get('/', function(req,res,next) {
   res.render('admin/types-new');
});
 
router.post('/compile',(req,res,next)=>{
  let name=req.session.newname;
  let id =req.session.newid;
  let yue;
  data.db.query("select * from classfiy where id=? and sort_name=?",[id,name],(err,results)=>{
    if(err!=null){
      console.log(err);
    }else{
      yue=results
      data.db.query("updata classfiy set sort_name=replace(sort_name,?,?) where id=?",[yue.sort_name,req.body.newsort_name,yue.id],(err,results)=>{
    if(err!=null){
      console.log(err)
    }else{
      console.log(results)
    }
  })
    }
  })
  
})

module.exports = router;
