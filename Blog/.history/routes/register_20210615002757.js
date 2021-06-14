 var express = require('express');
 var sd = require('silly-datetime');
var router = express.Router();
var config = require('../config/config');
let authCodes;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register',{status:true});
});

router.post('/Reg',(req,res)=>{
  let len;
  let user = new creatUser(req.body.name,req.body.password,req.body.email,req.body.authCode);
  console.log(user);
  if (user.authCode !=authCodes){
    res.json({status:"验证码不正确"})
    return;
  }
  config.db.query("select use_name from user where use_name = ?",[user.name],(err,results,fields) =>{
  if (err!=null){
    console.log(err)
  }
  len  = results.length;
  if(len >0){
    res.json({status:"此用户名已经被使用了换一个吧"});
    
    return;
   }else if(len==0){
     let nowTime = sd.format(new Date())
    config.db.query("insert into user (use_name,use_password,use_email,use_register_time) values(?,?,?,?)", [user.name,user.password,user.email,nowTime],(errs,result,fields) =>{
       if (errs!=null){
         console.log(errs)
         res.json({status:"要被玩坏了"})
       }
       console.log(result);
        req.session.user ={
          name :user.name,
          password :user.password,
        }
         res.redirect("http://localhost:3000/");
         return;
       
     });
   }
  });
    });
  router.post('/auth',(req,res)=>{
    console.log(req.body);
    if(req.body.email == ""){
      res.json({status:'false'})
      return;
    }else{
      authCodes =  config.Sendmaile(req.body.email);
      res.json({status:'true'});
      return;
    }
  })
function creatUser(name , password , email, authCode){
  this.name =name;
  this.password = password
  this.email = email;
  this.authCode =authCode;
}
module.exports = router;
