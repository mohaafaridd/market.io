const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const { formatUpdates } = require('./helpers/order.helper');

const postOrder = async (req, res) => {
  try {
    const { client: user } = req;
    const { products: productsIds } = req.body;

    const requests = productsIds.map(id =>
      Cart.findOne({ owner: user.id, product: id })
    );
    const products = (await Promise.all(requests))
      .filter(cart => cart !== null)
      .map(product => ({ id: product.id, amount: product.amount }));

    if (!products.length) {
      return res
        .status(400)
        .json({ success: false, message: "You've no products in your cart" });
    }

    const order = new Order({
      owner: user.id,
      products,
    });

    await order.save();

    res
      .status(201)
      .json({ success: true, message: 'Your order has been set!', order });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      formatUpdates(req.body.updates),
      { new: true }
    );

    res.json({ success: true, message: 'This order has been updated', order });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  postOrder,
  updateOrder,
};
