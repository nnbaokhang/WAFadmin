var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var whiteRouter = require('./routes/whitelistip');
var blackRouter = require('./routes/blacklistip');
var indexRouter = require('./routes/index')
var securityGroupRouter = require('./routes/securitygroup')
var inboundRouter = require('./routes/inbound')
var outboundRouter = require('./routes/outbound')
var suspiciousIPRouter = require('./routes/suspiciousip')
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
uri="mongodb://localhost:27017/WAF"
mongoose.connect(uri);
var db = mongoose.connection;

echo 'AWS_SECRET_KEY = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEZ' >foo.txt
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/securitygroup',securityGroupRouter)
app.use('/whitelistip', whiteRouter);
app.use('/blacklistip', blackRouter);
app.use('/suspiciousip',suspiciousIPRouter)

app.use('/inbound',inboundRouter)
app.use('/outbound',outboundRouter)

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

app.listen(5000)
module.exports = app;
