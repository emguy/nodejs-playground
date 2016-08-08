import express from 'express';
import multer from 'multer';
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
  let name = req.body.name;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let password2 = req.body.password2;

  if(req.file) {
  	console.log('Uploading File...');
  	let profileimage = req.file.filename;
  } else {
  	console.log('No File Uploaded...');
  	let profileimage = 'noimage.jpg';
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
  } else {
  	console.log('No Errors');
  }
});

export { router as default };

