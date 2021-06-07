var express = require('express');
var config = require('../config/config');
var router = express.Router();

router.get('/:?', function(req, res, next) {
  console.log(req.query.id)
  config.db.query("select * from essay where article_id = ?",[req.query.id],(err,results,fild)=>{
    if(err!=null){
      console.log(err)
    }else if(results[0] !=undefined && results[0].article_html != null ){
      res.render('show_blog',{html:results[0].article_html,title:results[0].article_html});
    }else{
      res.render('error/404');
    }
  })
});

module.exports = router;
