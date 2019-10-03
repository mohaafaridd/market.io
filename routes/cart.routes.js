const express = require('express');

const api = require('./api/carts.api');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const pages = require('../controllers/pages/cart.page');
const Role = require('../middlewares/role');

const router = express.Router();

router.use('/api', api);
router.get('/my-cart', authorization(Role.User), authentication, pages.myCart);

module.exports = router;
