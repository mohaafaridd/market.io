const express = require('express');
const moment = require('moment');
const Order = require('../models/order.model');

const api = require('./api/orders.api');
const pages = require('../controllers/pages/order.page');

const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const Role = require('../middlewares/role');

const router = express.Router();
router.use('/api', api);
router.get('/:id', authorization(Role.User), authentication, pages.getOrder);
module.exports = router;
