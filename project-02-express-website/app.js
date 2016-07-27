import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

let app = express();
const PORT = 1337;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => res.send('<h1>Hello world</h1>'));

app.listen(PORT);
console.log('Server is running on port '.concat(PORT));
