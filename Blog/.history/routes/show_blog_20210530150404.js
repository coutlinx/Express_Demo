var express = require('express');
var config = require('../config/config');
var router = express.Router();

router.get('/:?', function(req, res, next) {
  console.log(req.query.id)
  config.db.query("select article_html from essay where article_id = ?",[req.query.id],(err,results,fild)=>{
    if(err!=null){
      console.log(err)
    }else if(results.length != undefined){
      res.render('show_blog',{html:results[0].article_html});
    }else{
      return;
    }
  })
  
});

module.exports = router;
