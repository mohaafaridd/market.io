const express = require('express');

// Validate Form
const controller = require('../controllers/search.controller');

const router = express.Router();

// @route       GET api/search
// @desc        Search for bundles or products
// @access      Public
router.get('/', controller.search);

module.exports = router;
