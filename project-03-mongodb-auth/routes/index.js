import express from 'express';

let router = express.Router();

let ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login');
};

router.get('/', esureAuthenticated, (req, res, next) => {
  res.render('index', { title: 'Express' });
});

export { router as default };
