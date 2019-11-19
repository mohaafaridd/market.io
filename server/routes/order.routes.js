const express = require('express');

// Validate Form
const validation = require('../middlewares/validationResult');
const validator = require('../controllers/store.validator');
const controller = require('../controllers/order.controller');
// Validate Role
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const Role = require('../middlewares/role');

const router = express.Router();

// @route       POST api/orders
// @desc        Create an order
// @access      Private
router.post(
  '/',
  authorization(Role.User),
  authentication,
  controller.postOrder
);

// @route       GET api/orders
// @desc        Gets all orders
// @access      Private
router.get('/', authorization(Role.User), authentication, controller.getOrders);

module.exports = router;
