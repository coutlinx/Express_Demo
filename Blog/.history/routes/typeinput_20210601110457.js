const { select } = require('async');
var express = require('express');
var router = express.Router();
var data=require('../config/config');

router.get('/',(req,res,next)=>{
    res.render('admin/types-input')
})