const express = require("express");

// Validate Form
const validation = require("../middlewares/validationResult");
const validator = require("../controllers/store.validator");
const controller = require("../controllers/store.controller");
// Validate Role
const authorization = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");
const Role = require("../middlewares/role");

const router = express.Router();

// @route       POST api/stores/statistics
// @desc        Get store statistics
// @access      Private
router.get(
  "/statistics",
  authorization(Role.Store),
  authentication,
  controller.getStatistics
);

// @route       POST api/stores/p/:id
// @desc        Get store products
// @access      Public
router.get(
  "/p/:id",
  authorization(Role.Store),
  authentication,
  controller.getProducts
);

// @route       POST api/stores/b/:id
// @desc        Get store bundles
// @access      Public
router.get(
  "/b/:id",
  authorization(Role.Store),
  authentication,
  controller.getBundles
);

module.exports = router;
