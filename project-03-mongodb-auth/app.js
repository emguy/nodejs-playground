import bodyParser from 'body-parser';
import connectFlash from 'connect-flash';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressMessages from 'express-messages';
import expressValidator from 'express-validator';
import favicon from 'serve-favicon';
import flash from 'connect-flash';
import logger from 'morgan';
import passport from 'passport';
import path from 'path';
import routes from './routes/index';
import session from 'express-session';
import users from './routes/users';

let app = express();

/* tell express about the view engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/* - midware handle fild uploads */
import multer from 'multer';
let upload = multer({ dest: './uploads' });
//app.use(multer({ dest: './uploads'}));

/* uncomment after placing your favicon in /public */
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false} ));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* midware - Handle Sessions */
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}));

/* midware - passport */
app.use(passport.initialize());
app.use(passport.session());

/* midware - validator */
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    let namespace = param.split('.');
    let root = namespace.shift();
    let formParam = root;
    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

/* midware - express messaging */
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = expressMessages(req, res);
  next();
});

app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

/* setup routes */
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
