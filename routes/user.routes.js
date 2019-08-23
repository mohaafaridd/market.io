const express = require('express');
const router = express.Router();

const controllers = require('../controllers/user.controllers');

router.post('/register', controllers.postRegister);

module.exports = router;
