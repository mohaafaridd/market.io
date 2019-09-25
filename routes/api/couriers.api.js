const express = require('express');
// const authorization = require('../../middlewares/courier.authorization');
// const authentication = require('../../middlewares/courier.authentication');
const authorization = require('../../middlewares/authorization');
const authentication = require('../../middlewares/authentication');

const controller = require('../../controllers/api/courier.controller');
const Role = require('../../middlewares/role');

const router = express.Router();

router.post('/register', controller.postRegister);
router.post('/login', controller.postLogin);
router.post(
  '/logout',
  authorization(Role.Courier),
  authentication,
  controller.postLogout
);

module.exports = router;
