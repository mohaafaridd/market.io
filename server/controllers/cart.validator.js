const { check, oneOf } = require('express-validator');

// Pass if one not empty
const postCart = [
  oneOf([
    check('product', 'An item is required').isMongoId(),
    check('bundle', 'An item is required').isMongoId(),
  ]),
];

const updateCart = [
  check('amount')
    .exists()
    .withMessage('Please, provide an amount')
    .isInt({ min: 1 })
    .withMessage('Amount must be greater than 1'),
];

module.exports = {
  postCart,
  updateCart,
};
