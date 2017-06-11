// make momentjs available
var moment = require('moment');
var shortDateFormat = "ddd H:mm";

var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);

console.log('env', process.env.NODE_ENV);
var env=(process.env.NODE_ENV || "development")
if(env === "staging") {
  mongoose.connect('mongodb://admin:1a5b55d299304ba44ad64056c7ef17c4@ds135029.mlab.com:35029/festivalplanner');
}else if (env==="production") {
  mongoose.connect('mongodb://localhost/festivalplanner');
}else{
  mongoose.connect('localhost:27017/festivalplanner')
}

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


var routes       = require('./routes/index');

/* admin */
var locations    = require('./routes/admin/locations');
var bands        = require('./routes/admin/bands');
var musicians    = require('./routes/admin/musicians');
var festivals    = require('./routes/admin/festivals');
var performances = require('./routes/admin/performances');

/* api */
var schedule          = require('./routes/api/schedule');
var band              = require('./routes/api/band');
var location          = require('./routes/api/location');

var app = express();
// make moment available as a variable in every EJS page
app.locals.moment = moment;
app.locals.shortDateFormat = shortDateFormat;

app.listen(process.env.PORT || 3000, function() {
    console.log('listening on 3000')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var sessionOpts = {
  saveUninitialized: true, // saved new sessions
  resave: false, // do not automatically write to the session store
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  //secret: config.session.secret,
  secret: 'keyboard cat',
  cookie : { secure: false, httpOnly: true, maxAge: 2419200000 } // configure when sessions expires
}

app.use(session(sessionOpts));
app.use(passport.initialize());
// call passport for admin routes
app.use(function(req, res, next){
  if(req.url.match('/admin/*')) {
    passport.session()(req, res, next)
  } else {

    next(); // do not invoke passport
  }
});
//app.use(passport.session());

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/', routes);
app.use('/admin/locations', locations);
app.use('/admin/bands', bands);
app.use('/admin/musicians', musicians);
app.use('/admin/festivals', festivals);
app.use('/admin/performances', performances);
app.use('/api/schedule', schedule);
app.use('/api/band', band);
app.use('/api/location', location);

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

module.exports = app;
