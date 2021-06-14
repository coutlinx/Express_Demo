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
        results[0].article_title.substr(0,3)
        config.db.query("select article_title from essay where article_title like ?",)
        res.render("show_blog", {
          html: results[0].article_html,
          title: results[0].article_title,
          auth: results[0].use_name,
          icon: results[0].icon,
          recommend: 
        });
      } else {
        res.render("error/404");
      }
    }
  );
});

module.exports = router;
