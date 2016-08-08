import express from 'express';
i/mport multer from 'multer';
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
  //console.log('------------------');
  let name = req.body.name;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let password2 = req.body.password2;

  console.log(req.file);
});

export { router as default };
