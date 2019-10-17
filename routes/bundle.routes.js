const express = require('express');
const api = require('./api/bundle.api');

const router = express.Router();

router.use('/api', api);

module.exports = router;
