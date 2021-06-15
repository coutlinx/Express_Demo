var express = require('express');
var router = express.Router();
var db = require('../config/config');

/* GET home page. */
router.get('/', function(req,res,next){
    db.db.query("select * from user_friends ORDER BY id LIMIT 0,5",(err,results)=>{
                if(err !=null){
                  console.log(err);
                }else{
                    console.log(results);
              res.render('admin/friendlinks',{datai:results})
                }
              })
  });

  router.post('/delet',(req,res,next)=>{
    console.log(req.body.ID);
    db.db.query("DELETE FROM user_friends WHERE id = ?",[req.body.ID],(err,results)=>{
      if(err!=null){
        console.log(err)
      }else{
        console.log(results);
        res.redirect('http://localhost:3000/admin/types');
      }
    });
  });

module.exports = router;