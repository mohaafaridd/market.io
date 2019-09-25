const express = require('express');
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');

const controller = require('../controllers/api/product.controller');
const pages = require('../controllers/pages/product.page');
const Role = require('../middlewares/role');
const api = require('./api/products.api');

const router = express.Router();
router.use('/api', api);

router.get('/add', authorization(Role.Store), authentication, pages.addProduct);

router.get(
  '/:id',
  authorization(),
  authentication,
  controller.getProduct,
  pages.getProduct
);

module.exports = router;
