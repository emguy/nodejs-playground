import express from 'express';

let router = express.Router();

router.get('/users/', (req, res, next) => {
  res.send('respond with a resource');
});

export { router as default };
