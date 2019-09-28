const express = require('express');
const moment = require('moment');

const Order = require('../models/order.model');

const api = require('./api/orders.api');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const controller = require('../controllers/api/order.controller');
const pages = require('../controllers/pages/order.page');
const Role = require('../middlewares/role');

const router = express.Router();
router.use('/api', api);
router.get(
  '/my-orders',
  authorization(Role.User),
  authentication,
  pages.getOrders
);
router.get('/:id', authorization(Role.User), authentication, pages.getOrder);
module.exports = router;
