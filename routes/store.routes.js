const express = require('express');
const api = require('./api/stores.api');
const pages = require('../controllers/pages/store.page');
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const Role = require('../middlewares/role');

const router = express.Router();
router.use('/api', api);

// router.get(
//   '/dashboard',
//   authorization(Role.Store),
//   authentication,
//   pages.getDashboard
// );

router.get(
  '/dashboard',
  authorization(Role.Store),
  authentication,
  pages.getStatistics
);

router.get(
  '/add-product',
  authorization(Role.Store),
  authentication,
  pages.addProduct
);

// router.get(
//   '/my-products',
//   authorization(Role.Store),
//   authentication,
//   pages.getMyProducts
// );

router.get('/:username', authorization(), authentication, pages.getStore);

module.exports = router;
