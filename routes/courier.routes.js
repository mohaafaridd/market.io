const express = require('express');
const authorization = require('../middlewares/user.authorization');
const authentication = require('../middlewares/user.authentication');
const controller = require('../controllers/courier.controller');
const Role = require('../middlewares/role');

const router = express.Router();

router.post(
  '/resign',
  authorization(Role.Courier),
  authentication,
  controller.postResign
);

module.exports = router;
