import express from 'express';

let router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

export { router as default };
