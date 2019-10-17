const express = require('express');

// Validate Form
const validation = require('../middlewares/validationResult');
const validator = require('../controllers/bundle.validator');
const controller = require('../controllers/bundle.controller');
// Validate Role
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const Role = require('../middlewares/role');

const router = express.Router();

// @route       POST api/bundles
// @desc        Create a bundle
// @access      Private
router.post(
  '/',
  validator.postBundle,
  validation,
  authorization(Role.Store),
  authentication,
  controller.postBundle
);

// @route       PUT api/bundles/:id
// @desc        Adds product to bundle
// @access      Private
router.put(
  '/p/:id',
  validator.putBundle,
  validation,
  authorization(Role.Store),
  authentication,
  controller.putBundle
);

// @route       PATCH api/bundles/p/:id
// @desc        Deletes bundle
// @access      Private
router.patch(
  '/p/:id',
  validator.deleteFromBundle,
  validation,
  authorization(Role.Store),
  authentication,
  controller.deleteFromBundle
);

// @route       PATCH api/bundles/:id
// @desc        Updates a bundle information
// @access      Private
router.patch(
  '/:id',
  validator.patchBundle,
  validation,
  authorization(Role.Store),
  authentication,
  controller.patchBundle
);

// @route       DELETE api/bundles/:id
// @desc        Deletes bundle
// @access      Private
router.delete(
  '/:id',
  authorization(Role.Store),
  authentication,
  controller.deleteBundle
);

module.exports = router;
