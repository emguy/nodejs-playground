import User from '../models/users';
import express from 'express';
import multer from 'multer';
import passport from 'passport';
import { createUser, comparePassword, getUserByUsername, getUserById } from '../models/users';
import { Strategy as LocalStrategy } from 'passport-local';

let upload = multer({ dest: './uploads' });

let router = express.Router();

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/register', (req, res, next) => {
  res.render('register', {title: 'Register'});
});

router.get('/login', (req, res, next) => {
  res.render('login', {title: 'Login'});
});

router.post('/login', 
  passport.authenticate('local', {failureRedirect:'/users/login', failureFlash: 'Invalid username or password'}), 
  (req, res) => {
    req.flash('sucess', 'You are now logged in');
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('sucess', 'You are now logged ou.');
  res.redirect('/users/login');
});

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  getUserById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy((username, password, done) => {
  getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      console.log('Unkown User');
      return done(null, false, {message: 'Unkown User'});
    }

    console.log(user);

    comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
      console.log('Match');
        return done(null, user);
      } else {
      console.log('Invalid password');
        return done(null, false, {message: 'Invalid Password.'});
      }
    });
  });
}));

router.post('/register', upload.single('profileimage'),  (req, res, next) => {
  let profileimage = 'noimage.jpg';

  if(req.file) {
  	console.log('Uploading File...');
  	profileimage = req.file.filename;
  } else {
  	console.log('No File Uploaded...');
  }

  /* form validation */
  req.checkBody('name','Name field is required').notEmpty();
  req.checkBody('email','Email field is required').notEmpty();
  req.checkBody('email','Email is not valid').isEmail();
  req.checkBody('username','Username field is required').notEmpty();
  req.checkBody('password','Password field is required').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password);

  /* Check Errors */
  let errors = req.validationErrors();

  if(errors) {
  	res.render('register', {
  		errors: errors
  	});
    return;
  } 

  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    profileimage: profileimage
  });

  createUser(newUser, (err, user) => {
    if (err) throw err;
    console.log(user);
  });

  req.flash('sucess', 'You are now a registered user.');

  res.location('/');
  res.redirect('/');
});

export { router as default };

