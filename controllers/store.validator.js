const { check } = require('express-validator');

const postRegister = [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('phone', 'Phone is required')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
];

const postLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter your password')
    .not()
    .isEmpty(),
];

module.exports = {
  postRegister,
  postLogin,
};
