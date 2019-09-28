const express = require('express');
const api = require('./api/stores.api');
const pages = require('../controllers/pages/store.page');

const router = express.Router();
router.use('/api', api);

router.get('/:username', pages.getStore);

module.exports = router;
