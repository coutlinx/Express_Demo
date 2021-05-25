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
  if (req.session.user == undefined) {
    res.redirect("/login");
  }
  console.log(req.body);
  let status = "draft";
  let recommend = "false";
  let article_recommend_status,
    article_admire,
    article_reprint,
    article_discuss = "false";
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
  let ex ;
  let ID;
  config.db.query("select article_id from essay where article_md =?",[req.body.content],(err,results,fild)=>{
    if(err != null){
      console.log(err)
    }else if(results.length>0){
      ex = true
      ID = results[0].article_id;
    }
  })
  if(!ex){
    config.db.query(
      "select use_id from user where use_name = ?",
      [req.session.user.name],
      (err, results, fil) => {
        if (err != null) {
          console.log(err);
        } else {
          let id = results[0].use_id;
          config.db.query(
            "insert into essay (use_id,article_title,article_content,article_date,article_photo,article_md,article_html,article_classify,article_status,article_recommend,article_type_creat,article_recommend_status,article_admire,article_reprint,article_discuss) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
              id,
              req.body.title,
              req.body.description,
              now,
              req.body.firstPicture,
              req.body.content,
              req.body.linx,
              req.body.typeId,
              status,
              recommend,
              req.body.flag,
              article_recommend_status,
              article_admire,
              article_reprint,
              article_discuss
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
  }else{
    config.db.query(
      "select use_id from user where use_name = ?",
      [req.session.user.name],
      (err, results, fil) => {
        if (err != null) {
          console.log(err);
        } else {
          let id = results[0].use_id;
          config.db.query(
            "update  essay set use_id =? ,article_title = ?,article_content =?,article_date =?,article_photo =?,article_md =?,article_html =?,article_classify =?,article_status =?,article_recommend =?,article_type_creat =?,article_recommend_status =?,article_admire =?,article_reprint =?,article_discuss =? where article_id = ?",
            [
              id,
              req.body.title,
              req.body.description,
              now,
              req.body.firstPicture,
              req.body.content,
              req.body.linx,
              req.body.typeId,
              status,
              recommend,
              req.body.flag,
              article_recommend_status,
              article_admire,
              article_reprint,
              article_discuss,
              ID
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
  }
});
module.exports = router;
