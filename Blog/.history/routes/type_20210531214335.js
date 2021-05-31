var express = require('express');
const config = require('../config/config');
var router = express.Router();
var data=require('../config/config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  data.db.query("select * from essay where article_classify ='好文' ORDER BY article_id LIMIT 0,5",(err,results,fields)=>{
    if (err !=null){
      console.log(err);
    }else{
      // console.log(results)
       res.render('types',{datil:results})
    }
  });

  data.db.query("select sort_name from article_classification ORDER BY article_id LIMIT 0,5 ",(err,results,fild)=>{
    if(err !=null){
      console.log(err)
    }else{
      res.render('types',{data:results})
    }
  })
});

router.post('/Class',(req,res)=>{
  config.db("select * from essay where article_classify = ? ORDER BY article_id LIMIT 0,5 ",[req.body.Type],(err,results,fild)=>{
    if(err !=null){
      console.log(err)
    }else{
      res.json({data:results})
    }
  })
});

router.post('/mapleleft',function(req,res,next){
  let data="";
  data.db.query("select * from essay",(err,results,fields)=>{
    if (err !=null){
      console.log(err);
    }else{
      console.log(results)
      res.json({name:results})
    }
  });
});

router.post('/newclassfiy',function(req,res){
  console.log(req.body.Type)
    data.db.query("select * from essay where article_classify =? " , [req.body.Type],(err,results,fields)=>{
      if (err !=null){
        console.log(err);
      }else{
          
          console.log(results)
          res.json({new:results})
      }
    });

        
})


module.exports = router;
