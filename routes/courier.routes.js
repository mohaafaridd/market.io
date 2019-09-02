const express = require('express');
const authorization = require('../middlewares/courier.authorization');
const authentication = require('../middlewares/courier.authentication');
const controller = require('../controllers/courier.controller');
const Role = require('../middlewares/role');

const router = express.Router();

router.post('/register', controller.postRegister);
router.post('/login', controller.postLogin);
router.post(
  '/logout',
  authorization(Role.Courier),
  authentication,
  controller.postLogout
);

router.post(
  '/resign',
  authorization(Role.Courier),
  authentication,
  controller.postResign
);

module.exports = router;
