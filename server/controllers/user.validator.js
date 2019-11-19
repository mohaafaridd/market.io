const { check } = require('express-validator');

const postRegister = [
  check('name', 'Name is required')
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage('Name length must be between 2 and 20 characters'),
  check('phone', 'Phone is required')
    .not()
    .isEmpty()
    .matches(/^01(\d{9})$/)
    .withMessage('Phone Number has to be Egyptian'),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6, max: 100 }),
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
