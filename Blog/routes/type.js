const { json } = require('express');
var express = require('express');
var router = express.Router();
var config=require('../config/config');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('types');
// });

router.get('/',function(req,res,next){
  config.db.connect();
   var pager={};
   pager.article_id=config.db.query('SELECT sort_name FROM article_classification',(err,result)=>{
    if(err != null){
      console.log(err);
    }else{
      res.render('types',{
          list:pager.article_id
      })
   }}
   );
   console.log(pager.article_id)
   config.db.query('SELECT * FROM article_classification',(err,result)=>{
  if(err != null){
    console.log(err);
  }else{
    console.log(result);
    res.render('types',{
      list:pager.article_id
    })
  }
});
config.db.end();
   

   
  
})

module.exports = router;
