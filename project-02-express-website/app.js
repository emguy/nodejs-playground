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

app.listen(PORT);
console.log('Server is running on port '.concat(PORT));
