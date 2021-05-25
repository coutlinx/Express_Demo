var express = require("express");
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
      for (let y of config.article) {
        if ((y.ID != restults[i].article_id)) {
          config.article.push(article);
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
  if(req.body.Title != undefined){
    config.db.query("select article_md from essay where article_title = ?",[req.body.Title],(err,restults,fil)=>{
      if  (err != null){
        console.log(err)
      }else{
        req.session.MD = restults[0].article_md;
        res.json({status:"true"});
      }
    })
  }else{
    res.json({status:"false"});
  }
})
module.exports = router;
