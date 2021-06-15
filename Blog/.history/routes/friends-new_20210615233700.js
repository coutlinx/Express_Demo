var express = require('express');
var router = express.Router();
var db=require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next) {
  var datail,datas;
  console.log(req.session.usename);
  if(req.session.usename==undefined){
     res.redirect('login')
  }else{
    db.db.query("select * from user_friends as u where u.use_id=(select user.use_id from user where use_name=?) ",[req.session.usename],(err,results)=>{
      if(err !=null){
        console.log(err)
      }else{
              res.render('friends-new',{datai:results});
          }
        })
      }
});
  router.post('/delet',(req,res,next)=>{
    console.log(req.body.ID);
    db.db.query("DELETE FROM user_friends WHERE use_friends_id= ?",[req.body.ID],(err,results)=>{
      if(err!=null){
        console.log(err)
      }else{
        console.log(results);
        res.redirect('http://localhost:3000/friends-new');
      }
    });
  });

  router.post("/insert",(req,res)=>{
    req.session.newid=req.body.newid;
    req.session.newnoto=req.body.newnoto;
    res.json({status:"success"})
  });

  router.post('/newpage',(req,res)=>{
    console.log(req.body.buto)
    let k=0;
    let l=5;
    if(req.body.buto =='上一页'){
       db.db.query("select * from classify ORDER BY id LIMIT ?,?",[0,5],(err,results)=>{
      if(err!=null){
        console.log(err)
      }else{
        res.json({cc:results})
      }
    })
    }else if(req.body.buto=='下一页'){
      db.db.query("select * from classify ORDER BY id LIMIT ?,?",[k+5,l+5],(err,results)=>{
        if(err!=null){
          console.log(err)
        }else{
          res.json({cc:results})
        }
      })
    }
  })

module.exports = router;
