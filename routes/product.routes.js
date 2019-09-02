const express = require('express');
const api = require('./api/products.api');

const router = express.Router();
router.use('/api', api);

module.exports = router;
