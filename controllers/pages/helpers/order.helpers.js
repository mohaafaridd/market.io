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
  console.log('ordersWithProperties :', ordersWithProperties);
  return ordersWithProperties;
};

const attachProps = orders => {
  const mapped = orders.map(order => {
    const { carts } = order;
    const totalAmount = attachAmount(carts);
    const totalBill = attachBill(carts);
    return {
      ...order._doc,
      amount: totalAmount,
      bill: totalBill,
    };
  });

  return mapped;
};

// Calculate the total amount of product in one order
const attachAmount = carts => carts.reduce((a, b) => b.amount + a, 0);
// Calculate the total bill of products in one order
const attachBill = carts =>
  carts.reduce((a, b) => b.amount * b.product.price + a, 0);

module.exports = {
  fetchOrders,
};
