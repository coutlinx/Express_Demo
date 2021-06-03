var express = require('express');
var router = express.Router();
var db = require('../config/config');

/* GET home page. */
router.get('/', function(req,res,next){
  db.db.query("select * from classify ORDER BY sort_id LIMIT 0,5",(err,results)=>{
    if(err !=null){
      console.log(err);
    }else{
       res.render('admin/types',{datai:results})
    }
  })
});

module.exports = router;
