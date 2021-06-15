var express = require('express');
var config = require("../config/config");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!config.HasSession(req, res)) {
    return;
  }else{
    res.render('renewfriend');
  }
});

router.post("/renew",(req,res)=>{
    let fid=req.session.newid;
    let  fnoto=req.session.newnoto;
    console.log(fid);
    config.db.query("UPDATE user_friends SET use_friends_noto=? WHERE use_friends_id = ?",[req.body.noto,fid],(err,results)=>{
        if(err!=null){
            console.log(err)
        }else{
          res.redirect("http://localhost:3000/friends-new")
        }
    })
})

module.exports = router;