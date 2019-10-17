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

// @route       GET api/orders/:id
// @desc        Gets an order details
// @access      Private
router.get(
  '/:id',
  authorization(Role.User),
  authentication,
  controller.getOrder
);

// router.use('/api', api);

// router.get(
//   '/my-orders',
//   authorization(Role.User),
//   authentication,
//   pages.getOrders
// );
// router.get('/:id', authorization(Role.User), authentication, pages.getOrder);
module.exports = router;
