var mysql  = require('mysql');

let dbConfig = {
    host:"localhost",
    port :"3306",
    user : "root",
    password :"121",
    database:"demo",
};

 let db = mysql.createConnection(dbConfig);
 let session_config = {
    key:"linx",
    secret:"linx",
    rolling:true,
    renew:false,
    resave: false,
    saveUninitialized:true,
    cookie:{
        maxAge:400000
    }
 }
 module.exports = {db:db,session_config:session_config};

