const Order = require('../models/order.model');

const postOrder = async (req, res) => {
  const order = new Order({
    delivered: false,
    customer: req.user._id,
    products: req.user.cart,
  });

  res.json({ order });
};

module.exports = {
  postOrder,
};
