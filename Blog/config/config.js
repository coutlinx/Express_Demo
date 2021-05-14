var mysql = require("mysql");
var nodemail = require("nodemailer");
var async = require("async");
let dbConfig = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "121",
  database: "demo",
};
let users = {
  name: "",
  pass: "",
  icon: "",
};
let db = mysql.createConnection(dbConfig);
let session_config = {
  key: "linx",
  secret: "linx",
  rolling: true,
  renew: false,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 400000,
  },
};
let mailTransport = nodemail.createTransport({
  host: "smtp.qq.com",
  secure: true,
  port: 465,
  auth: {
    user: "1402284023@qq.com",
    pass: "owsmwxnquitmfigj",
  },
});
let code = "";
function Sendmaile(maile) {
  for (let i = 0; i < 6; i++) {
    code += parseInt(Math.random() * 10);
  }
  mailTransport.sendMail(
    {
      from: "1402284023@qq.com",
      to: maile,
      subject: "验证邮箱",
      html: `
            <p>你好！</p>
            <p>您正在注册LINX个人博客账号</p>
            <p>你的验证码是：<strong style="color: #ff4e2a;">${code}</strong></p>
            <p>***该验证码5分钟内有效***</p>`,
    },
    function (err, data) {
      if (err != null) {
        console.log(err);
        mailTransport.close();
      } else {
        console.log(data);
        mailTransport.close();
      }
    }
  );
  return code;
}
function user(req) {
  users.name = req.session.user.name;
  users.pass = req.session.user.password;
  let task=[
    function(){ AdminIcon()},
    function(){UserIcon()}
  ];
//   async.waterfall(task,(err,results)=>{
//       if(err){
//           console.log(err);
//       }else{
//         console.log(results);
//         db.end();
//       }
//   })
  console.log(AdminIcon(users.name));
}
 function AdminIcon(name) {
   db.query(
    "select icon from admin where Aname = ?",
    [name],
    (err, results) => {
      if (err != null) {
        console.log(err);
      } else if (results.length > 0) {
        return results[0].icon;
      } else {
        return "3.jpg";
      }
    }
  );
}
async function UserIcon(name) {
   db.query(
    "select icon from user where name =?",
    [users.name],
    (err, results) => {
      if (err != null) {
        console.log(err);
      } else if (results.length > 0) {
        return results[0].icon;
      } else {
        return "3.jpg";
      }
    }
  );
}
module.exports = {
  db: db,
  session_config: session_config,
  mailTransport: mailTransport,
  Sendmaile,
  code: code,
  user,
  users: users,
};
