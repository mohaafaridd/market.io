const express = require('express');
const authorization = require('../middlewares/user.authorization');
const controller = require('../controllers/user.controller');
const router = express.Router();

router.post('/register', controller.postRegister);
router.post('/login', controller.postLogin);
router.post('/logout', authorization(), controller.postLogout);

module.exports = router;
