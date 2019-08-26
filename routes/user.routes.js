const express = require('express');
const authentication = require('../middlewares/userAuthentication');

const router = express.Router();

const controller = require('../controllers/user.controller');

router.post('/register', controller.postRegister);
router.post('/login', controller.postLogin);
router.post('/logout', authentication, controller.postLogout);

module.exports = router;
