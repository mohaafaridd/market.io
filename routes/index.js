const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { user } = req.cookies;
  res.render('index', { title: 'Express', user });
});

router.get('/register', (req, res) => {
  res.render('general/register', { title: 'Register' });
});

router.get('/login', (req, res) => {
  res.render('general/login', { title: 'Login' });
});

module.exports = router;
