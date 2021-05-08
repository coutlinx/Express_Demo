 var express = require('express');
var router = express.Router();
var db = require('../config/config')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/',(req,res)=>{
  let len;
  let user = new creatUser(req.body.name,req.body.password,req.body.mobile);
  console.log(user);
db.query("select name from user where name = ?",[user.name],(err,results,fields) =>{
  if (err!=null){
    console.log(err)
  }
  len  = results.length;
  if(len >0){
    res.send("<h1>用户名已存在</h1>");
   }else if(len==0){
     db.query("insert into user (name,password,mobile) values(?,?,?)", [user.name,user.password,user.mobile],(errs,result,fields) =>{
       if (errs!=null){
         console.log(errs)
       }
       console.log(result);
       if (result.protocol41){
         res.redirect("http://localhost:3000/")
       }
     });
   }
  });
    });
  
function creatUser(name , password , mobile){
  this.name =name;
  this.password = password
  this.mobile = mobile;
}
module.exports = router;
