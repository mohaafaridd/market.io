const { check } = require('express-validator');

const postBundle = [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
];

const patchBundle = [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
];

const putBundle = [
  check('product', 'Name is required').isMongoId(),
  check('discount', 'Discount have minimum of 0 and maximum of 100').isInt({
    min: 0,
    max: 100,
  }),
];

const deleteFromBundle = [check('product', 'Name is required').isMongoId()];

module.exports = {
  postBundle,
  patchBundle,
  putBundle,
  deleteFromBundle,
};
