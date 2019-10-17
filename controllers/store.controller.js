const ms = require('ms');
const Store = require('../models/store.model');
const Product = require('../models/product.model');
const Bundle = require('../models/bundle.model');
const { extractErrors } = require('./helpers/validator');

// @route       POST api/stores
// @desc        Register a store
// @access      Public
const postRegister = async (req, res) => {
  const regex = new RegExp(`[',.]`, 'gi');
  try {
    const { name } = req.body;
    const username = name
      .split(' ')
      .join('-')
      .trim()
      .replace(regex, '-')
      .toLowerCase();
    const store = new Store({ ...req.body, username });
    await store.save();
    const token = await store.generateAuthToken();
    const maxAge = ms(process.env.MAX_AGE);
    res
      .cookie('token', token, { maxAge })
      .cookie('client', JSON.stringify(store), { maxAge })
      .status(201)
      .json({
        success: true,
        message: 'Registered Successfully!',
        store,
        token,
      });
  } catch (error) {
    const errors = extractErrors(error.errors);

    res
      .status(400)
      .json({ success: false, message: 'Registration failed', cause: errors });
  }
};

// @route       POST api/stores/login
// @desc        Login a store
// @access      Public
const postLogin = async (req, res) => {
  try {
    const store = await Store.findByCredentials(req.body);
    const token = await store.generateAuthToken();
    const maxAge = ms(process.env.MAX_AGE);

    res
      .cookie('token', token, { maxAge })
      .cookie('client', JSON.stringify(store), { maxAge })
      .json({
        success: true,
        message: `Welcome back ${store.name}!`,
        store,
        token,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Login failed' });
  }
};

// @route       POST api/stores/logout
// @desc        Logout a store
// @access      Private
const postLogout = async (req, res) => {
  try {
    req.client.tokens = req.client.tokens.filter(
      token => token.token !== req.token
    );
    await req.client.save();

    res
      .clearCookie('token')
      .clearCookie('client')
      .json({
        success: true,
        message: `${req.client.name} Logged out Successfully!`,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Logging out failed' });
  }
};

// @route       POST api/stores/statistics
// @desc        Get store statistics
// @access      Private
const getStatistics = async (req, res) => {
  // TODO: Aggregation to get the following
  // 1 - Products count (ref: products)
  // 2 - Bundles count (ref: bundles)
  // 3 - Total Sales (ref: orders)
  // 4 - Net profit (ref: orders)
  // 5 - Products (ref: products)
  // 6 - Bundles (ref: bundles)
  res.json({ message: 'Not done yet' });
};

// @route       POST api/stores/p/:id
// @desc        Get store products
// @access      Public
const getProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.find({ store: id });
    res.json({ success: true, message: 'Search complete', payload: products });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: 'Search failed', payload: error });
  }
};

// @route       POST api/stores/b/:id
// @desc        Get store bundles
// @access      Public
const getBundles = async (req, res) => {
  try {
    const { id } = req.params;
    const bundles = await Bundle.find({ store: id });
    res.json({ success: true, message: 'Search complete', payload: bundles });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: 'Search failed', payload: error });
  }
};

module.exports = {
  postRegister,
  postLogin,
  postLogout,
  getStatistics,
  getProducts,
  getBundles,
};
