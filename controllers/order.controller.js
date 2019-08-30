const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const { formatUpdates } = require('./helpers/order.helper');

const postOrder = async (req, res) => {
  try {
    const { products: productsIds } = req.body;

    const requests = productsIds.map(id =>
      Cart.findOne({ owner: req.user._id, id })
    );
    const products = (await Promise.all(requests))
      .filter(cart => cart !== null)
      .map(product => ({ id: product.id, amount: product.amount }));

    const order = new Order({
      owner: req.user._id,
      products,
    });

    await order.save();

    res.json({ order });
  } catch (error) {
    res.json({ error: { ...error }, message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      formatUpdates(req.body.updates),
      { new: true },
      (err, order) => {
        console.log(err);
      }
    );

    res.json({ order });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  postOrder,
  updateOrder,
};
