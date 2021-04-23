const { render } = require('ejs');
var express = require('express');
var router = express.Router();
var fs = require('fs')
var studnet; 
var oldName;
let search = [];
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
});
router.get('/', function(req, res, next) {
    res.render('demo1',{detial:studnet});
    return
})
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
    console.log(studnet)
    for (let i in studnet){
        if (studnet[i].name == req.body.name){
            studnet.splice(i,1);
            console.log(studnet)
            res.redirect('http://localhost:3000/demo1')
            return
        }
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
router.post('/search',(req,res) => {
    let name = req.body.name;
    if (name)
    pattern(name);
    if (search.length == 0){
    res.send('<p \"style=color:red;\">这边找不到您要的'+name+"呢</P>");
    }else{
    res.render('search',{detial:search});
    search.splice(0,search.length);
    }
    
    
})
function pattern(name){
    let num = /^[0-9]\d*$/
    let character = /[\u4E00-\u9FA5]/
    if (character.test(name)){
        for (let i in studnet){
            if (studnet[i].name.indexOf(name) >=0){
                search.push(studnet[i]);
            }
        }
    }else if (num.test(name)){
        for (let i in studnet){
            if (studnet[i].Chinese == name || studnet[i].math == name || studnet[i].English == name || studnet[i].total == name ){
                search.push(studnet[i]);
            }
        }
    }else{
        return
    }
}
module.exports = router;
