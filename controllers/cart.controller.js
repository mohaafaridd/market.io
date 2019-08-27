const Cart = require('../models/cart.model');
const { inStockCheck, modifyCart } = require('./helpers/cart.helper');

const postCart = async (req, res) => {
  try {
    const { user } = req;
    const { product } = req.body;
    const cart = await Cart.findOne({ owner: user._id });

    // checks for total amount ordered if available in stock
    const inStock = await inStockCheck(product, cart);
    if (!inStock) {
      throw new Error('The amount you ordered is out of our capabilities');
    }

    // Adds product to cart or edit it's amount
    const modifiedCart = modifyCart(product, cart);
    await cart.save();

    res.status(200).json({ message: 'Product was added to cart', cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postCart,
};
