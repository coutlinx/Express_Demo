var express = require("express");
const config = require("../config/config");
var db = require("../config/config");
var router = express.Router();
router.get("/", function (req, res, next) {
  if (req.session.user == undefined) {
    res.redirect("/login");
  } else {
    db.db.query(
      "select Aname from Admin where Aname = ? and Apassword = ?",
      [db.users.name, db.users.pass],
      (err, result, fileds) => {
        console.log(result);
        if (err != null) {
          console.log(err);
          config.db.end();
        }
        if (result.length > 0) {
          res.render("admin/index", {
            name: db.users.name,
            icon: db.users.icon,
          });
          config.db.end();
          return;
        } else {
          res.send(
            "<h1>您不是管理员,请点击旁边按钮跳转到登录界面</h1><a href='http://localhost:3000/login'>登录</a>"
          );
        }
      }
    );
  }
});

module.exports = router;
