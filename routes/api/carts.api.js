const express = require('express');
const authorization = require('../../middlewares/user.authorization');
const authentication = require('../../middlewares/user.authentication');
const controller = require('../../controllers/cart.controller');
const Role = require('../../middlewares/role');

const router = express.Router();

router.post('/', authorization(Role.User), authentication, controller.postCart);
router.delete(
  '/',
  authorization(Role.User),
  authentication,
  controller.deleteCart
);
module.exports = router;
