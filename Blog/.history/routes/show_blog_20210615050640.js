var express = require("express");
var config = require("../config/config");
var router = express.Router();

router.get("/:?", function (req, res, next) {
  console.log(req.query.id);
  config.db.query(
    "select *   from essay INNER JOIN  user  ON essay.use_id = user.use_id where article_id = ? ",
    [req.query.id],
    (err, results, fild) => {
      if (err != null) {
        console.log(err);
      } else if (results[0] != undefined && results[0].article_html != null) {
        let art = results[0];
        let recommend = results[0].article_title.substr(0,3)
        config.db.query("select article_title from essay where article_title like ?",[recommend],(err,results,fild)=>{
          if(err != null){
            console.log(err)
          }else{
            console.log(results);
            res.render("show_blog", {
              html: art.article_html,
              title: art.article_title,
              auth: art.use_name,
              icon: art.icon,
              recommend: results
            });
          }
        })
      } else {
        res.render("error/404");
      }
    }
  );
});

module.exports = router;
