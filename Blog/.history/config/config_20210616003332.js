const { nextTick } = require("async");
var mysql = require("mysql");
var nodemail = require("nodemailer");

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

let article = [];
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
  AdminIcon(users.name);
  return users;
}

function AdminIcon(name, callback) {
  db.query(
    "select icon from tab_admin where admin_name = ?",
    [name],
    (err, results, fields) => {
      callback(err, results);
    }
  );
}
async function UserIcon(name, callback) {
  db.query(
    "select icon from user where name =?",
    [users.name],
    (err, results, fields) => {
      callback(err, results);
    }
  );
}
function getArticle(callback) {
  let ID,
    Title,
    Time,
    Type = [];
  db.query(
    "select article_id,article_title,article_date,article_classify,article_recommend,article_status FROM `essay` ORDER BY article_id LIMIT 0,10",
    (err, results, fields) => {
      callback(err, results);
    }
  );
}

function HasSession(req, res) {
  if (req.session.user == undefined) {
    res.send(
      "<h1>您还没有登录,请点击旁边按钮跳转到登录界面</h1><a href='http://localhost:3000/login'>登录</a>"
    );
    return false;
  } else {
    return true;
  }
}
function IsAdmin(req,res){
  db.query("select * from tab_admin where admin_name =?",[req.session.user.name],(err,results,fild)=>{
    if(err!= null){
      console.log(err)
    }else{
      console.log(results);
      if(results.length == 0){
        
        return;
      }
    }
  })
}
function DeletArticle(id,callback){
  db.query("DELETE FROM `essay` WHERE article_id = ?",[id],(err,result,fields)=>{
    callback(err,result);
  })
}
module.exports = {
  db: db,
  session_config: session_config,
  mailTransport: mailTransport,
  Sendmaile,
  code: code,
  user,
  users: users,
  UserIcon,
  AdminIcon,
  getArticle,
  HasSession,
  article: article,
  DeletArticle,
  IsAdmin
};
