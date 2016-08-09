import express from 'express';
import multer from 'multer';
import User from '../models/users';
import { createUser } from '../models/users';

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

router.post('/register', upload.single('profileimage'),  (req, res, next) => {
  //let name = req.body.name;
  //let email = req.body.email;
  //let username = req.body.username;
  //let password = req.body.password;
  //let password2 = req.body.password2;
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

