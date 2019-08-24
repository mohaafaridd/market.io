const express = require('express');
const authentication = require('../middlewares/storeAuthentication');

const router = express.Router();
const controllers = require('../controllers/store.controllers');

router.post('/register', controllers.postRegister);
router.post('/login', controllers.postLogin);
router.post('/logout', authentication, controllers.postLogout);

module.exports = router;
