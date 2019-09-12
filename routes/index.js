const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { user, store } = req.cookies;
  res.render('index', { title: 'market.io', user, store });
});

router.get('/register', (req, res) => {
  const { user, store } = req.cookies;
  if (user || store) {
    return res.redirect('/');
  }
  res.render('general/register', { title: 'Register' });
});

router.get('/login', (req, res) => {
  const { user, store } = req.cookies;
  if (user || store) {
    return res.redirect('/');
  }
  res.render('general/login', { title: 'Login' });
});

module.exports = router;
