var express = require('express');
var db = require('../config/config')
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/Log',(req,res) =>{
  let admin = false;
  console.log(req.body);
  let user = new creatUser(req.body.name,req.body.password);
  db.db.query("select admin_name from tab_admin where admin_name = ? and admin_password = ?",[user.name,user.password],(err,results,fields)=>{
    if (err !=null){
      console.log(err);
    }
    if (results.length>0){
      admin = true;
    }
    if (!admin){
      db.db.query("select use_name from user where (use_name = ? or use_ihpone = ? )and use_password = ?",[user.name,user.name,user.password],(err,results,fields) =>{
        if (err!=null){
          console.log(err)
        }
        if  (results == []){
          res.json({status:"账号或密码错误!"});
          
        }
        let len  = results.length;
        if(len >0){
          req.session.user ={
            name :user.name,
            password :user.password,
          }
          res.json({status:"user"});
          return;
        }
    })
    }else{
      req.session.user ={
        name :user.name,
        password :user.password,
      }
      res.json({status:"admin"});
      for(let i =0;i<50;i++){

      }
    }
  })
  
});
function creatUser(name , password){
  this.name =name;
  this.password = password
}

module.exports = router;
