var express = require('express');
var config = require('../config/config');
var router = express.Router();

router.get('/:?', function(req, res, next) {
  console.log(req.query.id)
  config.db.query("select article_html from essay where article_id = ?",[req.query.id],(err,results,fild)=>{
    if(err!=null){
      console.log(err)
    }else if(results != []){
      res.render('show_blog',{html:results[0].article_html});
    }else{
      res.render('show_blog',{html:"<p>这篇文章好像被删除了，访问别的吧！</p>"});
    }
  })
});

module.exports = router;
