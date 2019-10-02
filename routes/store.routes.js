const express = require('express');
const api = require('./api/stores.api');
const pages = require('../controllers/pages/store.page');
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const Role = require('../middlewares/role');

const router = express.Router();
router.use('/api', api);

router.get(
  '/dashboard',
  authorization(Role.Store),
  authentication,
  pages.getStatistics
);

router.get(
  '/top/:limit',
  authorization(Role.Store),
  authentication,
  pages.getTopSeller
);

router.get(
  '/add-product',
  authorization(Role.Store),
  authentication,
  pages.addProduct
);

router.get('/:username', authorization(), authentication, pages.getStore);

module.exports = router;
