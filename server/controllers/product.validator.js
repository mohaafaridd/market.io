const { check } = require('express-validator');

const postProduct = [
  check('category', 'Category is required')
    .not()
    .isEmpty(),

  check('manufacturer', 'Manufacturer is required')
    .not()
    .isEmpty(),

  check('name', 'Name is required')
    .not()
    .isEmpty(),

  check('description', 'Description is required')
    .not()
    .isEmpty(),

  check('color', 'Color is required')
    .not()
    .isEmpty(),

  check('amount', 'Amount is required')
    .not()
    .isEmpty(),

  check('price', 'Price is required')
    .not()
    .isEmpty(),
];

const updateProduct = [
  check('category', 'Category is required')
    .not()
    .isEmpty(),

  check('manufacturer', 'Manufacturer is required')
    .not()
    .isEmpty(),

  check('name', 'Name is required')
    .not()
    .isEmpty(),

  check('description', 'Description is required')
    .not()
    .isEmpty(),

  check('color', 'Color is required')
    .not()
    .isEmpty(),

  check('amount', 'Amount is required')
    .not()
    .isEmpty(),

  check('price', 'Price is required')
    .not()
    .isEmpty(),

  check('discount', 'Discount is required')
    .not()
    .isEmpty(),
];

module.exports = {
  postProduct,
  updateProduct,
};
