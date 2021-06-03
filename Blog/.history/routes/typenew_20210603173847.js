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
  data.db.query("select * from classify where id=? and sort_name=?",[id,name],(err,results)=>{
    if(err!=null){
      console.log(err);
    }else{
      yue=results
      data.db.query("updata classify set sort_name=? where id=?",[req.body.newsort_name,yue.id],(err,results)=>{
    if(err!=null){
      console.log(err)
    }else{
      console.log(results);
      res.redirect('admin/types')
    }
  })
    }
  })
  
})

module.exports = router;
