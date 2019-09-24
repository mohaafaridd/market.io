const express = require('express');
const Order = require('../models/order.model');

const api = require('./api/orders.api');
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const Role = require('../middlewares/role');

const router = express.Router();
router.use('/api', api);
router.get(
  '/:id',
  authorization(Role.User),
  authentication,
  async (req, res) => {
    try {
      const { client: user } = req;
      const { id } = req.params;
      const order = await Order.findOne({ _id: id, user: user.id })
        .populate({
          path: 'carts',
          populate: [{ path: 'store' }, { path: 'product' }],
        })
        .populate('courier')
        .populate('user');
      console.log('here', order.carts);

      if (!order) {
        throw new Error('No order was found');
      }

      res.json({ order });
    } catch (error) {
      res.json({ error: error.message });
    }
  }
);
module.exports = router;
