const ms = require('ms');
const Role = require('../middlewares/role');
const Store = require('../models/store.model');

const postRegister = async (req, res) => {
  try {
    const username = req.body.store.name
      .trim()
      .replace(/(\s|[',.])/g, '-')
      .toLowerCase();
    const store = new Store({ ...req.body.store, username, role: Role.store });
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
    res.status(400).json({ success: false, message: 'Registration failed' });
  }
};

const postLogin = async (req, res) => {
  try {
    const store = await Store.findByCredentials(req.body.store);
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

const getStore = async (req, res) => {
  try {
    const store = await Store.findOne({ username: req.params.username });

    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: 'No store was found' });
    }

    await store.populate('products').execPopulate();
    res.json({
      success: true,
      message: 'Store found',
      store,
      products: store.products,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  postRegister,
  postLogin,
  postLogout,
  getStore,
};
