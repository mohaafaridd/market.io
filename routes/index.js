const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { user, store } = req.cookies;
  const role = (user && 'User') || (store && 'Store') || 'Anonymous';
  res.render('index', { title: 'market.io', [role]: true });
});

router.get('/register', (req, res) => {
  const { user, store } = req.cookies;
  if (user || store) {
    return res.redirect('/');
  }
  const role = 'Anonymous';
  res.render('general/register', { title: 'Register', [role]: true });
});

router.get('/login', (req, res) => {
  const { user, store } = req.cookies;
  if (user || store) {
    return res.redirect('/');
  }
  const role = 'Anonymous';
  res.render('general/login', { title: 'Login', [role]: true });
});

module.exports = router;
