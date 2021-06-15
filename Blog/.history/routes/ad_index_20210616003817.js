var express = require("express");
const config = require("../config/config");
var db = require("../config/config");
var router = express.Router();
router.get("/", function (req, res, next) {
  config.IsAdmin(req,res)
  if (req.session.user == undefined) {
    return res.redirect("/login");
  } else {
    db.db.query(
      "select admin_id from tab_admin where admin_name  = ? and admin_password = ?",
      [req.session.user.name, req.session.user.password],
      (err, result, fileds) => {
        console.log(result);
        if (err != null) {
          console.log(err);
        }
        if (result.length > 0) {
         config.AdminIcon(req.session.user.name,(err,results) =>{
          let icon = null;
            if (err != null) {
              console.log(err);
            } else if (results.length > 0) {
              icon =  results[0].icon;
            } else {
              icon = "3.jpg";
            }
            config.users.name=req.session.user.name;
            config.users.pass=req.session.user.password;
            config.users.icon=icon;
            console.log(config.users);
            return res.render("admin/index", {
              name: config.users.name,
              icon: config.users.icon
            });
         })
          
        } else {
          return res.send(
            "<h1>您不是管理员,请点击旁边按钮跳转到登录界面</h1><a href='http://localhost:3000/login'>登录</a>"
          );
        }
      }
    );
  }
});

module.exports = router;
