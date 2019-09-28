const Order = require('../../models/order.model');
const { fetchOrders, parseDates } = require('./helpers/order.helper');

const getOrders = async (req, res, next) => {
  try {
    const { client: user } = req;
    const { role } = user;
    const { page } = req.query;
    const orders = await fetchOrders(user, page);

    res.render('user/orders', { title: 'My orders', orders, [role]: true });
  } catch (error) {
    res.json({
      success: false,
      message: 'Could not reach your orders',
      error: error.message,
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const { client: user } = req;
    const { role } = user;
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

    const dates = parseDates(order);

    res.render('user/order', {
      title: 'Order',
      [role]: true,
      order,
      dates,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  getOrder,
  getOrders,
};
