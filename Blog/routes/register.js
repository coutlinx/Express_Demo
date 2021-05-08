 var express = require('express');
var router = express.Router();
var db = require('../config/config')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/',(req,res)=>{
  let user = new creatUser(req.body.name,req.body.password,req.body.mobile);
  console.log(user);

db.query("select name from user where name = "+ user.name,(err,results,fields) =>{
  if (err!=null){
    console.log(err)
  }
  console.log(results)
});
})
function creatUser(name , password , mobile){
  this.name =name;
  this.password = password
  this.mobile = mobile;
}
module.exports = router;
