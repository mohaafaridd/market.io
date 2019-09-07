const Cart = require('../models/cart.model');

const {
  inStockCheck,
  increaseBooking,
  decreaseBooking,
} = require('./helpers/cart.helper');

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
      { owner: user.id, product: product.id },
      { $set: { product: product.id }, $inc: { amount: product.amount } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await increaseBooking(product);

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
        owner: user.id,
        product: product,
      })
    );

    const responses = await Promise.all(requests);

    await decreaseBooking(products);

    res.json({ cart: responses });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  postCart,
  deleteCart,
};
