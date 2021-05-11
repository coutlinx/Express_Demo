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
  db.db.query("select Aname from admin where Aname = ? and Apassword = ?",[user.name,user.password],(err,results,fields)=>{
    if (err !=null){
      console.log(err);
    }
    if (results.length>0){
      admin = true;
    }
    if (!admin){
      db.db.query("select name from user where (name = ? or mobile = ? )and password = ?",[user.name,user.name,user.password],(err,results,fields) =>{
        if (err!=null){
          console.log(err)
        }
        let len  = results.length;
        if(len >0){
          req.session.user ={
            name :user.name,
            password :user.password,
          }
          res.render("index");
          return;
        }else if (len == 0){
          res.json({status:"账号或密码错误!"});
          return;
        }
    })
    }else{
      req.session.user ={
        name :user.name,
        password :user.password,
      }
      res.redirect("http://localhost:3000/admin");
      return;
    }
  })
  
});
function creatUser(name , password){
  this.name =name;
  this.password = password
}
module.exports = router;
