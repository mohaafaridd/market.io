const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/register', (req, res) => {
  res.render('general/register', { title: 'Register' });
});

module.exports = router;
