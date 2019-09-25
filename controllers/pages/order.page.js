const moment = require('moment');
const Order = require('../../models/order.model');

const extractDates = order => {
  const orderDate = moment.utc(order.createdAt).format('DD - M - Y');
  const orderTime = moment.utc(order.createdAt).format('hh:mm a');

  const deliveryDate = order.delivered
    ? moment.utc(order.updatedAt).format('DD - M - Y')
    : moment
        .utc(order.updatedAt)
        .add(1, 'week')
        .format('DD - M - Y');
  const deliveryTime = order.delivered
    ? moment.utc(order.updatedAt).format('hh:mm a')
    : moment
        .utc(order.updatedAt)
        .add(10, 'hours')
        .format('hh:mm a');

  return {
    order: { date: orderDate, time: orderTime },
    delivery: { date: deliveryDate, time: deliveryTime },
  };
};

const getOrder = async (req, res) => {
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

    const dates = extractDates(order);

    res.render('user/order', {
      title: 'Order',
      order,
      dates,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  getOrder,
};
