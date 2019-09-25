const express = require('express');
const api = require('./api/carts.api');

const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');

const controller = require('../controllers/api/cart.controller');
const Role = require('../middlewares/role');

const router = express.Router();
router.use('/api', api);

router.get(
  '/my-cart',
  authorization(Role.User),
  authentication,
  controller.getCart,
  (req, res) => {
    const { cart, client } = req;
    const { role } = client;

    res.render('user/cart', { title: 'Shopping Cart', [role]: true, cart });
  }
);

module.exports = router;
