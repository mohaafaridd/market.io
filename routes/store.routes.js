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

// @route       GET api/stores/statistics
// @desc        Get store statistics
// @access      Private
router.get(
	'/statistics',
	authorization(Role.Store),
	authentication,
	controller.getStatistics,
);

// @route       GET api/stores/statistics/products
// @desc        Get store products statistics
// @access      Private
router.get(
	'/statistics/products',
	authorization(Role.Store),
	authentication,
	controller.getProducts,
);

// @route       GET api/stores/statistics/bundles
// @desc        Get store bundles statistics
// @access      Private
router.get(
	'/statistics/bundles',
	authorization(Role.Store),
	authentication,
	controller.getBundles,
);

module.exports = router;
