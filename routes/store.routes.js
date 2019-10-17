const express = require('express');

// Validate Form
const validation = require('../middlewares/validationResult');
const validator = require('../controllers/store.validator');
const controller = require('../controllers/store.controller');
// Validate Role
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const Role = require('../middlewares/role');

const router = express.Router();

// @route       POST api/stores
// @desc        Register a store
// @access      Public
router.post('/', validator.postRegister, validation, controller.postRegister);

// @route       POST api/stores/login
// @desc        Login a store
// @access      Public
router.post('/login', validator.postLogin, validation, controller.postLogin);

// @route       POST api/stores/logout
// @desc        Logout a store
// @access      Private
router.post(
  '/logout',
  authorization(Role.Store),
  authentication,
  controller.postLogout
);

// @route       POST api/stores/statistics
// @desc        Get store statistics
// @access      Private
router.get(
  '/statistics',
  authorization(Role.Store),
  authentication,
  controller.getStatistics
);

// @route       POST api/stores/p/:id
// @desc        Get store products
// @access      Public
router.get('/p/:id', controller.getProducts);

// @route       POST api/stores/b/:id
// @desc        Get store bundles
// @access      Public
router.get('/b/:id', controller.getBundles);

module.exports = router;
