var mysql  = require('mysql');

let dbConfig = {
    host:"localhost",
    port :"3306",
    user : "root",
    password :"121",
    database:"demo",
};

 let db = mysql.createConnection({
    host:"localhost",
    port :"3306",
    user : "root",
    password :"121",
    database:"demo"
 });
 module.exports = db;

