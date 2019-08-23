const express = require('express');

const router = express.Router();

const controllers = require('../controllers/user.controllers');

router.post('/register', controllers.postRegister);
router.post('/login', controllers.postLogin);
router.post('/logout', controllers.postLogout);

module.exports = router;
