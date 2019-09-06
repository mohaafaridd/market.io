const express = require('express');
const controller = require('../../controllers/search.controller');

const router = express.Router();

router.get('/', controller.search);

module.exports = router;
