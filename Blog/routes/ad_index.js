var express = require('express');
var db = require('../config/config')
var router = express.Router();

router.get('/', function(req, res, next) {
    let name,pass;
    if(req.session.user == undefined){
        res.redirect("/login")
    }else {
        name = req.session.user.name;
        pass = req.session.user.password;
        db.db.query("select Aname from Admin where Aname = ? and Apassword = ?",[name,pass],(err,result,fileds)=>{
            console.log(result)
            if (err!=null){
                console.log(err)
            }
            if (result.length>0){
                res.render("admin/index");  
                return;
            }else{
                res.send("<h1>您不是管理员,请点击旁边按钮跳转到登录界面</h1><a href='http://localhost:3000/login'>登录</a>")
            }
    });
    }
});

module.exports = router;
