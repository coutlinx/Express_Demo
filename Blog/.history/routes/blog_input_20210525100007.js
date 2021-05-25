var express = require("express");
var sd = require("silly-datetime");
const config = require("../config/config");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.user == undefined) {
    res.redirect("/login");
  }
  if (req.session.MD != undefined) {
    res.render("admin/blogs-input", { MD: req.session.MD });
  } else {
    res.render("admin/blogs-input", { MD: "" });
  }
});
router.post("/", (req, res) => {
  console.log(req.body);
  let status = "draft";
  let recommend = "false";
  let article_recommend_status,
    article_admire,
    article_reprint,
    article_discuss = "flase";
  if (req.body.recommend != undefined) {
    recommend = "true";
  }
  if (req.body.published == "true") {
    status = "article";
  }
  if (req.body.recommend != undefined) {
    article_recommend_status = "true";
  }
  if (req.body.appreciation != undefined) {
    article_admire = "true";
  }
  if (req.body.commentabled != undefined) {
    article_discuss = "true";
  }
  if (req.body.shareStatement != undefined) {
    article_reprint = "true";
  }
  let now = sd.format(new Date(), "YYYY-MM-DD HH:mm");
  config.db.query(
    "select use_id from user where use_name = ?",
    [req.session.user.name],
    (err, results, fil) => {
      if (err != null) {
        console.log(err);
      } else {
        let id = results[0].use_id;
        config.db.query(
          "insert into essay (use_id,article_title,article_content,article_date,article_photo,article_md,article_html,article_classify,article_status,article_recommend,article_type_creat,) value(?,?,?,?,?,?,?,?,?,?,?)",
          [
            id,
            req.body.title,
            req.body.description,
            now,
            req.body.firstPicture,
            req.body.linx,
            req.body.content,
            req.body.typeId,
            status,
            recommend,
            req.body.flag,
          ],
          (error, result, flid) => {
            if (error != null) {
              console.log(error);
            } else {
              console.log(result);
            }
          }
        );
      }
    }
  );
});
module.exports = router;
