var express = require('express');
var db = require('../config/config')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});
router.post('/',(req,res) =>{
  console.log(req.body)
  let user = new creatUser(req.body.name,req.body.password);
  db.query("select name from user where name = ? and password = ?",[user.name,user.password],(err,results,fields) =>{
    if (err!=null){
      console.log(err)
    }
    let len  = results.length;
    if(len >0){
      res.redirect("http://localhost:3000/")
    }else if (len == 0){
      res.send("<h1>账户或密码错误</h1>")
    }
})
});
function creatUser(name , password){
  this.name =name;
  this.password = password
}
module.exports = router;
