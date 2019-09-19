const Cart = require('../models/cart.model');

const {
  inStockCheck,
  increaseBooking,
  decreaseBooking,
} = require('./helpers/cart.helper');

const postCart = async (req, res) => {
  try {
    const { client: user } = req;
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

    res
      .status(200)
      .json({ success: true, message: 'Product was added to your cart', cart });
  } catch (error) {
    res.status(400).json({ success: true, message: error.message });
  }
};

const getCart = async (req, res, next) => {
  const { client: user } = req;
  const cart = await Cart.find({ owner: user.id });
  req.cart = cart;
  next();
};

const deleteCart = async (req, res) => {
  try {
    const { client: user } = req;
    const { products } = req.body;

    const requests = products.map(product =>
      Cart.findOneAndDelete({
        owner: user.id,
        product: product,
      })
    );

    const responses = await Promise.all(requests);

    await decreaseBooking(products);

    res.json({
      success: true,
      message: "You've removed a product from your cart",
      cart: responses,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const deleteFullCart = async (req, res) => {
  const { client: user } = req;
  try {
    const products = await Cart.find({ owner: user.id });
    const mappedProducts = products.map(product => product.product);
    await Cart.deleteMany({ owner: user.id });
    await decreaseBooking(mappedProducts);
    res.json({
      success: true,
      message: 'All products in your cart have been removed',
      products: mappedProducts,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  deleteCart,
  deleteFullCart,
  getCart,
  postCart,
};
