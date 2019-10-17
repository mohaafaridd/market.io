const express = require('express');

// Validate Form
const validation = require('../middlewares/validationResult');
const validator = require('../controllers/cart.validator');
const controller = require('../controllers/cart.controller');
// Validate Role
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const Role = require('../middlewares/role');

const router = express.Router();

// @route       POST api/carts
// @desc        Create a cart
// @access      Private
router.post(
  '/',
  authorization(Role.User),
  authentication,
  validator.postCart,
  validation,
  controller.postCart
);

// @route       GET api/carts/
// @desc        Gets user carts
// @access      Private
router.get('/', authorization(Role.User), authentication, controller.getCarts);

// @route       PATCH api/carts/:id
// @desc        Update a cart
// @access      Private
router.patch(
  '/:id',
  authorization(Role.User),
  authentication,
  validator.updateCart,
  validation,
  controller.updateCart
);

// @route       DELETE api/carts/:id
// @desc        Delete a cart
// @access      Private
router.delete(
  '/:id',
  authorization(Role.User),
  authentication,
  controller.deleteCart
);

// @route       DELETE api/carts/
// @desc        Clear all user's carts
// @access      Private
router.delete(
  '/',
  authorization(Role.User),
  authentication,
  controller.clearCart
);

module.exports = router;
