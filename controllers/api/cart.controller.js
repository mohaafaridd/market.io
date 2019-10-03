const Cart = require('../../models/cart.model');
const { INCREASE, DECREASE } = require('./constants/cart.flags');

const {
  inStockCheck,
  patchBooking,
  calculateBills,
} = require('./helpers/cart.helper');

const postCart = async (req, res) => {
  try {
    const { client: user } = req;
    const { payload, type, store } = req.body;

    // TODO: Check for stock
    // TODO: Change booking

    const cart = await Cart.findOneAndUpdate(
      { user: user.id, [type]: payload, store, ordered: false },
      { $inc: { amount: 1 } },
      {
        context: 'query',
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        upsert: true,
      }
    );

    res.json({
      success: true,
      message: `You have added a ${type} to your cart`,
      cart,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const patchCart = async (req, res) => {
  try {
    const { client: user } = req;
    const { payload, type, mode } = req.body;
    const coefficient = mode === 'increase' ? 1 : -1;

    // TODO: Check for stock
    // TODO: Change booking

    const cart = await Cart.findOneAndUpdate(
      { user: user.id, [type]: payload, ordered: false },
      { $inc: { amount: coefficient } },
      { context: 'query', runValidators: true, new: true }
    );

    res.json({
      success: true,
      message: `You have updated your ${type} amount`,
      cart,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { client: user } = req;
    const { id } = req.params;
    const cart = await Cart.findOneAndDelete({ _id: id, user: user.id });
    if (!cart) {
      throw new Error('No cart was found');
    }
    res.json({
      success: true,
      message: `You have deleted an item from your cart`,
      cart,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const { client: user } = req;
    await Cart.deleteMany({ user: user.id });
    res.json({
      success: true,
      message: `You have wiped your cart`,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  postCart,
  patchCart,
  deleteCart,
  clearCart,
};
