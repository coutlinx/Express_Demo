const { select } = require('async');
var express = require('express');
const config = require('../config/config');
var router = express.Router();
var data=require('../config/config');

 var datil,datas;
/* GET users listing. */
router.get('/', function(req, res, next) {
  config.HasSession(req,res);
  data.db.query("select * from essay where article_classify ='好文' ORDER BY article_id LIMIT 0,5",(err,results,fields)=>{
    if (err !=null){
      console.log(err);
    }else{
      datil = results;
       data.db.query("select * from classify ORDER BY id LIMIT 0,5",(err,results,fields)=>{
        if(err !=null){
          console.log(err)
        }else{
          datas = results
          res.render("types",{datil:datil,datas:datas});

    }
      })
    }
  })
})

router.post('/Class',(req,res)=>{
  config.db("select * from essay where article_classify = ? ORDER BY article_id LIMIT 0,5 ",[req.body.Type],(err,results,fild)=>{
    if(err !=null){
      console.log(err)
    }else{
      res.json({data:results})
    }
  })
});

 router.post('/newpa',function(req,res){
        let i;  
        var before=req.body.before;
        var newnext=req.body.next;
        let k=0 ;
        let l=5;
        if(i ==before){
          k=k+5
          l=l+5
          data.db.query("select * from essay  ORDER BY article_id LIMIT ?,?",[k,l+5],(err,results)=>{
            if(err!=null){
              console.log(err);
            }else{
                 res.json({datil:results});  
            }
          })
        }else if( i==newnext){
          k=k-5
          l=l-5
          data.db.query("select * from essay  ORDER BY article_id LIMIT ?,?",[k,l],(err,results)=>{
            if(err!=null){
              console.log(err);
            }else{
                 res.json({datil:results});  
            }
          })
        }
});

router.post('/newclassfiy',function(req,res){
  console.log(req.body.Type)
    data.db.query("select * from essay where article_classify =? " , [req.body.Type],(err,results,fields)=>{
      if (err !=null){
        console.log(err);
      }else{
          console.log(results)
          res.json({yy:results})
      }
    });        
})


module.exports = router;
