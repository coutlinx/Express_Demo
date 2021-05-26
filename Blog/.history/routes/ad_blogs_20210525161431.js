var express = require("express");
var sd = require('silly-datetime');
var router = express.Router();
var config = require("../config/config");

let Recommend, Status;

router.get("/", function (req, res) {
  if (!config.HasSession(req, res)) {
    return;
  }
  config.getArticle((err, restults) => {
    if (err != null) {
      console.log(err);
    } else {
      console.log(restults);
    }
    if(restults.length==0){
      res.render("admin/blogs", {
        name: config.users.name,
        icon: config.users.icon,
        article: "",
      });
      return
    }else{
    for (let i = 0; i < restults.length; i++) {
      if (restults[i].article_recommend == "true") {
        Recommend = "是";
      } else if (restults[i].article_recommend == "false") {
        Recommend = "否";
      }
      if (restults[i].article_status == "draft") {
        Status = "草稿";
      } else if (restults[i].article_status == "article") {
        Status = "成品";
      }
      let article = {
        ID: restults[i].article_id,
        Title: restults[i].article_title,
        Time: restults[i].article_date,
        Type: restults[i].article_types,
        Recommend: Recommend,
        Status: Status,
      };
      if(config.article.length == 0){
        config.article.push(article);
      }else{
        let y = restults.length-1;
          if(config.article[y] == undefined){
            config.article.push(article);
            y--;
          }
          else if ((restults[y].ID != config.article[y].article_id)) {
            config.article.push(article);
            y--;
          }else{
            y--;
          }
          if(y<0){
            y =0;
          }
        
      }
    }
    res.render("admin/blogs", {
      name: config.users.name,
      icon: config.users.icon,
      article: config.article,
    });
    }
  });
});

router.post("/delet", (req, res) => {
  config.DeletArticle(req.body.ID, (err, restults) => {
    if (err != null) {
      console.log(err);
    } else {
      console.log(restults);
      res.json({ status: "success" });
    }
  });
});
router.post("/compile",(req,res)=>{
  let time = sd.format(new Date(req.body.Time));
  if(req.body.Title != undefined){
    config.db.query("select article_md,article_title,article_type_creat,article_photo,article_classify,article_content from essay where article_title = ? and article_date = ?",[req.body.Title,time],(err,restults,fil)=>{
      if  (err != null){
        console.log(err)
      }else{
        req.session.MD = restults[0].article_md;
        req.session.Title = restults[0].article_title;
        req.session.type = restults[0].article_type_creat;
        req.session.photo = restults[0].article_photo;
        req.session.introduce = restults[0].article_content
        config.db.query("select sort_name from classify where id = ?",[restults[0].article_classify],(err,restults,fild)=>{
          if(err!=null){
            console.log(err);
          }else{
            req.session.classify = restults[0].sort_name
            res.json({status:"true"});
          }
        })
        
      }
    })
  }else{
    res.json({status:"false"});
  }
})
module.exports = router;
