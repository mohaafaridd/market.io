const Cart = require('../models/cart.model');
const { INCREASE, DECREASE } = require('./constants/cart.flags');

const { inStockCheck, patchBooking } = require('./helpers/cart.helper');

const postCart = async (req, res) => {
  try {
    const { client: user } = req;
    const { product, store } = req.body;
    const amount = 1;
    // checks for total amount ordered if available in stock
    const inStock = await inStockCheck(product, amount, user);
    if (!inStock) {
      throw new Error('The amount you ordered is out of our capabilities');
    }

    const cart = await Cart.findOneAndUpdate(
      { user: user.id, product, store },
      { $set: { product }, $inc: { amount } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await patchBooking(product, amount);

    res
      .status(200)
      .json({ success: true, message: 'Product was added to your cart', cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getCart = async (req, res, next) => {
  const { client: user } = req;
  const cart = await Cart.find({ user: user.id })
    .populate('product')
    .populate('store');
  req.cart = cart;
  next();
};

const patchCart = async (req, res) => {
  const { client: user } = req;
  const { product, mode } = req.body;

  try {
    const validModes = ['increase', 'decrease'];
    console.log('mode :', mode);
    const isValid = validModes.includes(mode);
    if (!isValid) {
      throw new Error('invalid mode');
    }

    const coefficient = mode === 'increase' ? INCREASE : DECREASE;
    const cart = await Cart.findOneAndUpdate(
      { product, user: user.id },
      { $inc: { amount: 1 * coefficient } },
      { context: 'query', runValidators: true, new: true }
    );

    await patchBooking(product, 1, coefficient);

    res.json({ success: true, message: 'Patch completed', cart });
  } catch (error) {
    res.json({ success: false, message: 'Patch failed', error: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { client: user } = req;
    const { product, amount } = req.body;
    const cart = await Cart.findOneAndDelete({ product, user: user.id });
    await patchBooking(product, amount, DECREASE);
    res.json({
      success: true,
      message: "You've removed a product from your cart",
      cart,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const deleteFullCart = async (req, res) => {
  const { client: user } = req;
  try {
    // Store product
    const products = await Cart.find({ user: user.id });
    if (products.length < 1) {
      throw new Error('Cart is already Empty');
    }

    await Cart.deleteMany({ user: user.id });

    const requests = products.map(item =>
      patchBooking(item.product, item.amount, DECREASE)
    );
    const response = await Promise.all(requests);

    res.json({
      success: true,
      message: 'All products in your cart have been removed',
      products,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  deleteCart,
  deleteFullCart,
  getCart,
  patchCart,
  postCart,
};
