const moment = require('moment');

const Order = require('../../../models/order.model');

const fetchOrders = async (user, page) => {
  const orders = await Order.find({ user: user.id })
    .populate({
      path: 'carts',
      populate: [{ path: 'store' }, { path: 'product' }],
    })
    .limit(10)
    .skip(page ? page - 1 : 0);

  const ordersWithProperties = attachProps(orders);
  return ordersWithProperties;
};

// Attaches amount and bill to ORDERS
const attachProps = orders => {
  const mapped = orders.map(order => {
    const { carts } = order;
    const totalAmount = attachAmount(carts);
    const totalBill = attachBill(carts);
    const dates = parseDates(order);
    return {
      ...order._doc,
      amount: totalAmount,
      bill: totalBill,
      dates,
    };
  });

  return mapped;
};
// Calculate the total amount of product in one order
const attachAmount = carts => carts.reduce((a, b) => b.amount + a, 0);
// Calculate the total bill of products in one order
const attachBill = carts =>
  carts.reduce((a, b) => b.amount * b.product.price + a, 0);

const parseDates = order => {
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

module.exports = {
  fetchOrders,
  parseDates,
};
