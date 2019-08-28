const Cart = require('../models/cart.model');
const { inStockCheck } = require('./helpers/cart.helper');

const postCart = async (req, res) => {
  try {
    const { user } = req;
    const { product } = req.body;

    // checks for total amount ordered if available in stock
    const inStock = await inStockCheck(product, user);
    if (!inStock) {
      throw new Error('The amount you ordered is out of our capabilities');
    }

    const cart = await Cart.findOneAndUpdate(
      { owner: user._id, id: product.id },
      { $set: { id: product.id }, $inc: { amount: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: 'Product was added to cart', cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { user } = req;
    const { products } = req.body;

    const requests = products.map(product =>
      Cart.findOneAndDelete({
        owner: user._id,
        id: product,
      })
    );

    const responses = await Promise.all(requests);

    res.json({ cart: responses });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  postCart,
  deleteCart,
};
