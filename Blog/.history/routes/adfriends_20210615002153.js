var express = require('express');
var router = express.Router();
var db = require('../config/config');

/* GET home page. */
router.get('/', function(req,res,next){
    db.db.query("select * from user_friends ORDER BY id 0,5",(err,results)=>{
                if(err !=null){
                  console.log(err);
                }else{
                    console.log(results);
              res.render('admin/friendlinks',{datai:results})
                }
              })
  });

module.exports = router;