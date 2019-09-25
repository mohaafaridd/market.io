const express = require('express');
const moment = require('moment');
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
        .populate('courier');

      if (!order) {
        throw new Error('No order was found');
      }

      const orderDate = moment.utc(order.createdAt).format('D - M - Y');
      const deliveryDate = order.delivered
        ? moment.utc(order.updatedAt).format('h:mm')
        : null;

      res.render('user/order', {
        title: 'Order',
        order,
        orderDate,
        deliveryDate,
      });
      // res.json({ order });
    } catch (error) {
      res.json({ error: error.message });
    }
  }
);
module.exports = router;
