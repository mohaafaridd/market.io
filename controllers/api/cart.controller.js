const Cart = require('../../models/cart.model');
const Bundle = require('../../models/bundle.model');
const { INCREASE, DECREASE } = require('./constants/cart.flags');

const {
  inStockCheck,
  patchBooking,
  calculateBills,
} = require('./helpers/cart.helper');

const postCart = async (req, res) => {
  try {
    const { client: user } = req;
    const { product = null, bundle: bundleId = null, store } = req.body;

    // TODO: Check for stock
    // TODO: Change booking

    let cart;
    let type;

    if (bundleId) {
      const bundle = await Bundle.findById(bundleId);
      type = 'bundle';
      const requests = bundle.products.map(product =>
        Cart.findOneAndUpdate(
          {
            user: user.id,
            product,
            bundle: bundleId,
            ordered: false,
            store,
          },
          { $inc: { amount: 1 } },
          {
            context: 'query',
            new: true,
            runValidators: true,
            setDefaultsOnInsert: true,
            upsert: true,
          }
        )
      );
      const response = await Promise.all(requests);
      cart = response;
    } else {
      type = 'product';
      cart = await Cart.findOneAndUpdate(
        { user: user.id, product, store, ordered: false, bundle: null },
        { $inc: { amount: 1 } },
        {
          context: 'query',
          new: true,
          runValidators: true,
          setDefaultsOnInsert: true,
          upsert: true,
        }
      );
    }

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
    const { product = null, bundle: bundleId = null, mode } = req.body;
    const coefficient = mode === 'increase' ? 1 : -1;

    // TODO: Check for stock
    // TODO: Change booking
    let cart;
    let type;
    if (bundleId) {
      type = 'bundle';
      cart = await Cart.updateMany(
        { user: user.id, bundle: bundleId, ordered: false },
        { $inc: { amount: coefficient } },
        { context: 'query', runValidators: true, new: true }
      );
    } else {
      type = 'product';
      cart = await Cart.findOneAndUpdate(
        { user: user.id, product, bundle: null, ordered: false },
        { $inc: { amount: coefficient } },
        { context: 'query', runValidators: true, new: true }
      );
    }

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
