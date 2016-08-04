import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import expressValidator from 'express-validator';
import { localStrategy } from 'passport-local';
import multer from 'multer';
import flash from 'connect-flash';
import mongo from 'mongodb';
import mongoose from 'mongoose';
import connectFlash from 'connect-flash';
import expressMessages from 'express-messages';

import routes from './routes/index';
import users from './routes/user';



let db = mongoose.connection;
let app = express();

/* tell express about the view engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// handle fild uploads
//app.use(multer({ dest: './uploads'}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Handle Sessions
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());












// Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    let namespace = param.split('.');
    let root = namespace.shift();
    let formParam = root;
    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));












app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = expressMessages(req, res);
  next();
});

app.use('/', routes);
app.use('/users', users);

/* catch 404 and forward to error handler */
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* error handlers */

/* development error handler (will print stacktrace) */
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

/* production error handler (no stacktraces leaked to user) */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export { app as default };
