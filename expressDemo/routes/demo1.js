var express = require('express');
var router = express.Router();
var fs = require('fs')
var studnet; 
var oldName;
fs.readFile(__dirname+"/bean/task.json",(err,date) =>{
    if (err){
        console.log(err);
    }else{
        date = JSON.parse(date);
        console.log(date);
        for (let i of date){
         i.total = Number(i.math)+Number(i.English)+Number(i.Chinese)
        }
        studnet = date
        
    }
router.get('/', function(req, res, next) {
        res.render('demo1',{detial:studnet});
    })
  
});
router.post("/",(req,res)=>{
    if (req.body.oldName!=undefined){
        console.log(req.body.oldName)
        oldName= req.body.oldName;
    }else{
        req.body.total=Number(req.body.Chinese) + Number(req.body.math) + Number(req.body.English);
    console.log(req.body)
    studnet.unshift(req.body)
    res.render('demo1',{detial:studnet});
    }
    
})
router.post('/delet',(req,res)=>{
    console.log(req.body.name)
    for (let i in studnet){
        if (studnet[i].name == req.body.name){
            studnet.splice(i,1);
            console.log(studnet)
        }
        res.redirect('http://localhost:3000/demo1')
    }
})
router.post('/change',(req,res) => {
    console.log(req.body);
    let obj = new Object();
    for (let i in studnet){
        if (req.body.name ==studnet[i].name || oldName == studnet[i].name ){
            studnet.splice(i,1);
            obj.name = req.body.name;
            obj.math = req.body.math;
            obj.Chinese = req.body.Chinese;
            obj.English = req.body.English;
            req.body.total=Number(req.body.Chinese) + Number(req.body.math) + Number(req.body.English);
            obj.total = req.body.total;
        }
    }
    studnet.unshift(obj)
    console.log(studnet);
res.redirect('http://localhost:3000/demo1')
})
module.exports = router;
