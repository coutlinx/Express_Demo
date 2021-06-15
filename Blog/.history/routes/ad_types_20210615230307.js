var express = require('express');
const config = require('../config/config');
var router = express.Router();
var db = require('../config/config');
const oute  = require('./typenew');

/* GET home page. */
router.get('/', function(req,res,next){
  if(!config.HasSession(req,res)){
    return;
  }else{
    db.db.query("select * from classify ORDER BY id LIMIT 0,5",(err,results)=>{
      if(err !=null){
        console.log(err);
      }else{
   res.render('admin/types',{datai:results})
      }
    })
  }
});

router.post("/insert",(req,res)=>{
  req.session.newid=req.body.newid;
  req.session.newname=req.body.newname;
  req.session.newnoto=req.body.newnoto;
  req.session.newname=req.body.newtime;
  res.json({status:"success"})
});
router.post('/',(req,res)=>{
  console.log(req.body)
})
router.post('/delet',(req,res,next)=>{
  console.log(req.body.ID);
  db.db.query("DELETE FROM classify WHERE id = ?",[req.body.ID],(err,results)=>{
    if(err!=null){
      console.log(err)
    }else{
      console.log(results);
      res.redirect('http://localhost:3000/admin/types');
    }
  });
});

// router.post('/compile',(req,res)=>{
    
// })
router.post('/select',(req,res)=>{
  console.log(req.body.sortid);
  console.log(req.body.sortname);
  db.db.query("select * from classify where id=? or sort_name=?",[req.body.sortid,req.body.sortname],(err,results)=>{
    if(err!=null){
      console.log(err);
    }else{
      console.log(results)
       res.json({datas:results})
      }
});
})
router.post('/newpage',(req,res)=>{
  console.log(req.body.before)
  db.db.query("select * from classify ORDER BY id LIMIT 0,5",(err,results)=>{
    if(err!=null){
      console.log(err)
    }else{
      res.json({cc:results})
    }
  })
})



module.exports = router;
