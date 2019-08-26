const express = require('express');
const authentication = require('../middlewares/storeAuthentication');

const router = express.Router();
const controller = require('../controllers/store.controller');

router.post('/register', controller.postRegister);
router.post('/login', controller.postLogin);
router.post('/logout', authentication, controller.postLogout);
router.get('/:username', controller.getStore);

module.exports = router;
