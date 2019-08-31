const express = require('express');
const authorization = require('../middlewares/user.authorization');
const authentication = require('../middlewares/user.authentication');
const controller = require('../controllers/order.controller');
const Role = require('../middlewares/role');

const router = express.Router();

router.post(
  '/',
  authorization(Role.User),
  authentication,
  controller.postOrder
);

router.patch(
  '/:id',
  authorization(Role.Delivery),
  authentication,
  controller.updateOrder
);

module.exports = router;
