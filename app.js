var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var redisStore   = require('connect-redis')(session);
var mongoose     = require('mongoose');

var routes       = require('./routes/index');
var users        = require('./routes/users');

mongoose.connect('mongodb://127.0.0.1:27017/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// function createStr(length){
//   var arr = [
//     'a','b','c','d','e','f','g','h','i','j',
//     'k','l','m','n','p','q','r','s','t','u',
//     'v','w','x','y','z','A','B','C','D','E',
//     'F','G','H','I','J','K','L','M','N','P',
//     'Q','R','S','T','U','V','W','X','Y','Z',
//     '0','1','2','3','4','5','6','7','8','9'
//   ]
//   var Range = arr.length - 1;
//   var Rand = [];
//   for(var i=0;i<length;i++){
//     Rand.push(arr[Math.round(Math.random() * Range)]);
//   }
//   console.log(Rand.join(''))
//   return Rand.join('');
// }
// createStr(128);

app.use(session({
  store: new redisStore(),
  secret: 'yBBYrGUWPPFHwVCXRdJE3he6HMAmRpehNBsxJ2a2IImVw1kv2DQ6m87NwWmDAsaMFmuhhgZk2ZtsqNfYQhfG7BQx8N9EKHVeKSKlXvtb6cbZS2FJswYjp6NbD7pQzwI4',
  cookie: { maxAge: 60 * 1000 * 60 * 24 * 30 }
}));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
/* supervisor app */
app.listen(3012);

module.exports = app;
