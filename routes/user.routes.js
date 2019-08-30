const express = require('express');
const authentication = require('../middlewares/userAuthentication');
const authorization = require('../middlewares/authorization');

const router = express.Router();

const controller = require('../controllers/user.controller');

router.post('/register', controller.postRegister);
router.post('/login', controller.postLogin);
router.post('/logout', authorization(), controller.postLogout);

module.exports = router;
