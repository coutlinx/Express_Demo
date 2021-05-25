var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.MD !=undefined){
    res.render('admin/blogs-input',{MD:req.session.MD});
  }else{
    res.render('admin/blogs-input',{MD:""});
  }
});
router.post('/',(req,res)=>{
  console.log(req.body);
})
module.exports = router;
