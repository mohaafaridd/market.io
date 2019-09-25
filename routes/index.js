const express = require('express');
const router = express.Router();
const pages = require('../controllers/pages/index.page');

router.get('/', pages.getMainPage);

router.get('/register', pages.getRegisterPage);

router.get('/login', pages.getLoginPage);

module.exports = router;
