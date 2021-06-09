var express = require('express');
var router = express.Router();
var db = require('../config/config');

/* GET home page. */
router.get('/', function(req,res,next){
  db.db.query("select * from classify ORDER BY id LIMIT 0,5",(err,results)=>{
    if(err !=null){
      console.log(err);
    }else{
       res.render('admin/types',{datai:results})
    }
  })
});

router.post('/delet',(req,res,next)=>{
  db.db.query("DELETE FROM classify WHERE id = ?",[req.body.id],(err,results)=>{
    if(err!=null){
      console.log(err)
    }else{
      console.log(results);
      res.redirect('admin/types')
    }
  })
})
module.exports = router;