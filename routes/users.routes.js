const express = require('express');

// Validate Form
const validation = require('../middlewares/validationResult');
const validator = require('../controllers/user.validator');
const controller = require('../controllers/user.controller');
// Validate Role
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const Role = require('../middlewares/role');

const router = express.Router();

// @route       POST api/users
// @desc        Register a user
// @access      Public
router.post('/', validator.postRegister, validation, controller.postRegister);

// @route       POST api/users/login
// @desc        Logout a user
// @access      Public
router.post('/login', validator.postLogin, validation, controller.postLogin);

// @route       POST api/users/logout
// @desc        Logout a user
// @access      Private
router.post(
  '/logout',
  authorization(Role.User),
  authentication,
  controller.postLogout
);

module.exports = router;
