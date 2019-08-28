const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

const postOrder = async (req, res) => {
  try {
    const { products: productsIds } = req.body;

    const requests = productsIds.map(id =>
      Cart.findOne({ owner: req.user._id, id })
    );
    const carts = await Promise.all(requests);

    res.json({ carts });
  } catch (error) {
    res.json({ error: { ...error }, message: error.message });
  }
};

module.exports = {
  postOrder,
};
