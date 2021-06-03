var express = require('express');
var router = express.Router();
var db = require('../config/config');

/* GET home page. */
router.get('/', function(req,res,next){
  let datai,datas;
  db.db.query("select * from classify ORDER BY id LIMIT 0,5",(err,results)=>{
    if(err !=null){
      console.log(err);
    }else{
             res.render('admin/types',{datai:results})
    }
  })
});

router.post('/delet',(req,res,next)=>{
  console.log(req.body.ID);
  db.db.query("DELETE FROM classify WHERE id = ?",[req.body.ID],(err,results)=>{
    if(err!=null){
      console.log(err)
    }else{
      console.log(results);
    }
  });
});

// router.post('/compile',(req,res)=>{
    
// })
router.post('/select',(req,res)=>{
  console.log(req.body.newsortid)
  db.db.query("select * from classify where id=? or sort_name=?",[req.body.newsortid,req.body.newsortname],(err,results)=>{
    if(err!=null){
      console.log(err);
    }else{
      console.log(results)
       res.render('admin/types',{datai:results})
      }
});
})
module.exports = router;
