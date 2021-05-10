var mysql  = require('mysql');

let dbConfig = {
    host:"localhost",
    port :"3306",
    user : "root",
    password :"121",
    database:"Blog",
};

 let db = mysql.createConnection(
   dbConfig
 );

//  db.connect();

//  db.end();
 module.exports = db;

