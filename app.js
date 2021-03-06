var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var env = process.env.DEV ? require('./env') : process.env;

var routes = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var categories = require('./routes/categories');
var sessions = require('./routes/sessions');
var departments = require('./routes/departments');


if(process.env.SIMPLE_SEED)
  require('./simpleSeed');

var app = express();
app.set('view engine', 'ejs');

app.use(require('cors')());


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/browser', express.static(path.join(__dirname, 'browser')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.get('/', function(req, res, next){
  res.render('index', { GOOGLE_PLACES_API_KEY: env.GOOGLE_PLACES_API_KEY});
});

app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/categories', categories);
app.use('/api/sessions', sessions);
app.use('/api/departments', departments);

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
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});


module.exports = app;
