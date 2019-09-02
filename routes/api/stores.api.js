const express = require('express');
const authorization = require('../../middlewares/store.authorization');
const authentication = require('../../middlewares/store.authentication');
const controller = require('../../controllers/store.controller');
const Role = require('../../middlewares/role');

const router = express.Router();

router.post('/register', controller.postRegister);
router.post('/login', controller.postLogin);
router.post(
  '/logout',
  authorization(Role.Store),
  authentication,
  controller.postLogout
);
router.get('/:username', controller.getStore);

module.exports = router;
