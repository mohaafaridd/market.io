const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const Bundle = require('../models/bundle.model');

const helper = require('./helpers/cart');

// @route       POST api/carts
// @desc        Create a cart
// @access      Private
const postCart = async (req, res) => {
  try {
    const { client: user } = req;
    const { product = null, bundle = null } = req.body;

    const item = product
      ? await Product.findById(product)
      : await Bundle.findById(bundle);

    if (!item) {
      throw new Error('Item was not found');
    }

    // TODO: Check for stock
    // TODO: Change booking
    const type = product ? 'product' : 'bundle';
    const cart = await Cart.findOneAndUpdate(
      { user: user._id, product, bundle, ordered: false, store: item.store },
      { $inc: { amount: 1 } },
      {
        context: 'query',
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        upsert: true,
      }
    );

    res.status(200).json({
      success: true,
      message: `You have added a ${type} to your cart`,
      payload: cart,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route       PATCH api/carts/:id
// @desc        Update a cart
// @access      Private
const updateCart = async (req, res) => {
  try {
    const { client: user } = req;
    const { amount } = req.body;
    const { id } = req.params;

    // TODO: Check for stock
    // TODO: Change booking

    const cart = await Cart.findOneAndUpdate(
      {
        _id: id,
        user: user._id,
        ordered: false,
      },
      { $set: { amount } },
      { context: 'query', runValidators: true, new: true }
    );

    const type = cart.bundle ? 'bundle' : 'product';

    res.status(200).json({
      success: true,
      message: `You have updated your ${type} amount`,
      cart,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route       GET api/carts/
// @desc        Gets user carts
// @access      Private
const getCarts = async (req, res) => {
  try {
    const { client: user } = req;
    const { role } = user;

    // bundles: contained all bundles user has added in his cart
    const bundles = await helper.getBundles(user);
    const products = await helper.getProducts(user);
    const bill = helper.getBill(bundles, products);

    const cart = [bundles, products, bill];

    res.json({
      success: true,
      message: 'Carts found!',
      cart,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route       DELETE api/carts/:id
// @desc        Delete a cart
// @access      Private
const deleteCart = async (req, res) => {
  try {
    const { client: user } = req;
    const { id } = req.params;

    const cart = await Cart.findOneAndRemove({
      _id: id,
      user: user._id,
      ordered: false,
    });

    if (!cart) {
      throw new Error('No cart was found');
    }

    res.json({
      success: true,
      message: 'You have delete your cart',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route       DELETE api/carts/
// @desc        Clear all user's carts
// @access      Private
const clearCart = async (req, res) => {
  try {
    const { client: user } = req;

    const carts = await Cart.deleteMany({
      user: user._id,
      ordered: false,
    });

    res.json({
      success: true,
      message: 'You have cleared your carts',
      carts,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  postCart,
  updateCart,
  deleteCart,
  clearCart,
  getCarts,
};
