const Cart = require('../models/cart.model');
const { inStockCheck } = require('./helpers/cart.helper');

const postCart = async (req, res) => {
  try {
    const { user } = req;
    const { product } = req.body;
    const cart = await Cart.findOne({ owner: user._id });

    // checks for total amount ordered if available in stock
    const inStock = await inStockCheck(product, cart);

    res.json({ message: 'here', cart, inStock });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  postCart,
};
