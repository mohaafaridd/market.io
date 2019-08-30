const express = require('express');
const authorization = require('../middlewares/store.authorization');
const controller = require('../controllers/store.controller');
const Role = require('../middlewares/role');

const router = express.Router();

router.post('/register', controller.postRegister);
router.post('/login', controller.postLogin);
router.post('/logout', authorization(Role.Store), controller.postLogout);
router.get('/:username', controller.getStore);

module.exports = router;
