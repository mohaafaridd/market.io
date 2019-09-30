const express = require('express');
const api = require('./api/stores.api');
const pages = require('../controllers/pages/store.page');
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const role = require('../middlewares/role');

const router = express.Router();
router.use('/api', api);

router.get(
  '/dashboard',
  authorization(role.Store),
  authentication,
  pages.getDashboard
);
router.get('/:username', authorization(), authentication, pages.getStore);

module.exports = router;
