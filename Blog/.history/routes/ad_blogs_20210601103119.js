const e = require("express");
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
    if(restults==[]){
      res.render("admin/blogs", {
        name: config.users.name,
        icon: config.users.icon,
        article: "",
        classify:""
      });
      return
    }else{
    for (let i = 0; i < restults.length; i++) {
      if (restults[i].article_recommend == "true") {
        restults[i].article_recommend = "是";
      } else if (restults[i].article_recommend == "false") {
        restults[i].article_recommend = "否";
      }
      if (restults[i].article_status == "draft") {
        restults[i].article_status = "草稿";
      } else if (restults[i].article_status == "article") {
        restults[i].article_status = "成品";
      }
    }
       config.article = restults;
    config.db.query("select id,sort_name from classify",(err,restult,fild)=>{
      if  (err !=null){
        console.log(err);
      }else{
        console.log(restult)
    res.render("admin/blogs", {
          name: config.users.name,
          icon: config.users.icon,
          article: config.article,
          classify:restult,
        });
      }
    })
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
  req.session.compile = true;
  let time = sd.format(new Date(req.body.Time));
  if(req.body.Title != undefined){
    config.db.query("select article_md,article_title,article_type_creat,article_photo,article_classify,article_content,article_recommend_status,article_admire,article_reprint,article_discuss  from essay where article_title = ? and article_date = ?",[req.body.Title,time],(err,restults,fil)=>{
      if  (err != null){
        console.log(err)
      }else{
        req.session.MD = restults[0].article_md;
        req.session.Title = restults[0].article_title;
        req.session.type = restults[0].article_type_creat;
        req.session.photo = restults[0].article_photo;
        req.session.introduce = restults[0].article_content
        req.session.article_recommend_status = restults[0].article_recommend_status;
        req.session.article_admire = restults[0].article_admire;
        req.session.article_reprint = restults[0].article_reprint
        req.session.article_discuss = restults[0].article_discuss;
        req.session.classify = restults[0].article_classify;
        res.json({status:"true"});
      }
    })
  }else{
    res.json({status:"false"});
  }
})
router.post("/search",(req,res)=>{
  config.db("select * from essay where article_classify = (select sort_name from classify where id = ?) and article_title like %?%",[req.body.typeId,req.body.title],(err,restult,fild)=>{
    if(err != null){
      console.log(err);
    }else{
      res.json({data:restult});
    }
  })
})
module.exports = router;
