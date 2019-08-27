const Cart = require('../models/cart.model');
const {
  inStockCheck,
  getMatchedProducts,
  removeFromCart,
} = require('./helpers/cart.helper');

const postCart = async (req, res) => {
  try {
    const { user } = req;
    const { product } = req.body;

    // checks for total amount ordered if available in stock
    // const inStock = await inStockCheck(product, cart);
    // if (!inStock) {
    //   throw new Error('The amount you ordered is out of our capabilities');
    // }

    const cart = await Cart.findOneAndUpdate(
      { owner: user._id, id: product.id },
      { $set: { id: product.id }, $inc: { amount: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // // Adds product to cart or edit it's amount
    // const modifiedCart = addToCart(product, cart);
    // await cart.save();

    res.status(200).json({ message: 'Product was added to cart', cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { user } = req;
    const { products } = req.body;

    const cart = await Cart.findOne({ owner: user._id });
    const matches = getMatchedProducts(products, cart);
    if (matches.length === 0) {
      throw new Error('No matches were found');
    }

    // Removed
    const modifiedCart = removeFromCart(matches, cart);
    await Cart.findOneAndUpdate(
      { owner: user._id },
      { $pull: { products: modifiedCart } },
      { new: true }
    );
    Cart.find;
    // await cart.updateOne({ products: modifiedCart });
    // await cart.save();

    res.json({ matches, cart, modifiedCart });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  postCart,
  deleteCart,
};
