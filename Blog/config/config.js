var mysql  = require('mysql');

let dbConfig = {
    host:"localhost",
    port :"3306",
    user : "root",
    password :"121",
    database:"Demo",
};

 let db = mysql.createConnection({
    host:"localhost",
    port :"3306",
    user : "root",
    password :"121",
    database:"Demo"
 });
 module.exports = db;

