var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var typeRouter = require('./routes/type');
var archiversRouter = require('./routes/archives');
var registerRouter = require('./routes/register')
var loginRouter = require('./routes/login');
var musicRouter = require('./routes/music');
var messageRouter = require('./routes/message');
var fridensRouter = require('./routes/firends');
var aboutRouter = require('./routes/about');
var pictureRouter = require('./routes/picture');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.__express);
app.set('view engine', '.html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/types',typeRouter);
app.use('/archives',archiversRouter);
app.use('/register',registerRouter);
app.use('/login',loginRouter);
app.use('/music',musicRouter);
app.use('/message',messageRouter);
app.use('/friends',fridensRouter);
app.use('/about',aboutRouter);
app.use('/picture',pictureRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
