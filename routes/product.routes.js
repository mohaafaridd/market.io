const express = require('express');

// Validate Form
const validation = require('../middlewares/validationResult');
const validator = require('../controllers/product.validator');
const controller = require('../controllers/product.controller');
// Validate Role
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const Role = require('../middlewares/role');

const router = express.Router();

// @route       POST api/products
// @desc        Create a product
// @access      Private
router.post(
  '/',
  authorization(Role.Store),
  authentication,
  validator.postProduct,
  validation,
  controller.postProduct
);

// @route       GET api/products/:id
// @desc        Get product
// @access      Public
router.get('/:id', controller.getProduct);

// @route       PATCH api/products/:id
// @desc        Update a product
// @access      Private
router.patch(
  '/:id',
  authorization(Role.Store),
  authentication,
  validator.updateProduct,
  validation,
  controller.updateProduct
);

// @route       DELETE api/products/:id
// @desc        Delete a product
// @access      Private
router.delete(
  '/:id',
  authorization(Role.Store),
  authentication,
  controller.deleteProduct
);

module.exports = router;
