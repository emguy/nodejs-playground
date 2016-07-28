import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const PORT = 1337;

let app = express();

/* tell express about the view engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index', {title: 'my title'}));
app.get('/about', (req, res) => res.render('about', {title: 'my about title'}));
app.get('/contact', (req, res) => res.render('contact', {title: 'my contact title'}));

app.post('/contact/send', (req, res) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'emguy2000@gmail.com',
      pass: ''
    },
  });

  let  mailOptions = {
    from: 'Yu Zhang <emguy2000@gmail.com>',
    to: 'emguy2000@gmail.com',
    subject: 'website submission',
    text: 'You have a sumission with the following details ... Name: ' + req.body.name + 'Email: ' + req.body.email + 'Message: ' + req.body.message, 
    html: '<p> You have a sumission with the following details ... </p><ul><li>Name: ' + req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.redirect('/');
    } else {
      console.log('Message sent: ' + info.response);
      res.redirect('/');
    }
  });  

});

app.listen(PORT);
console.log('Server is running on port '.concat(PORT));
