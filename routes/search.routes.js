const express = require('express');
const api = require('./api/search.api');
const router = express.Router();

router.use('/api', api);
module.exports = router;
