const express = require('express');
const api = require('./api/carts.api');

const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');

const controller = require('../controllers/api/cart.controller');
const pages = require('../controllers/pages/cart.page');

const Role = require('../middlewares/role');

const router = express.Router();
router.use('/api', api);

router.get(
  '/my-cart',
  authorization(Role.User),
  authentication,
  controller.getCart,
  pages.myCart
);

module.exports = router;
