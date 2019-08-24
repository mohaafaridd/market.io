const ms = require('ms');
const Store = require('../models/store.model');

const postRegister = async (req, res) => {
  const store = new Store(req.body.store);
  try {
    await store.save();
    const token = await store.generateAuthToken();
    const maxAge = ms(process.env.MAX_AGE);
    res
      .cookie('authentication', token, { maxAge })
      .status(201)
      .json({ store, token });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const postLogin = async (req, res) => {
  try {
    const store = await Store.findByCredentials(
      req.body.store.username,
      req.body.store.password
    );

    const token = await store.generateAuthToken();
    const maxAge = ms(process.env.MAX_AGE);

    res.cookie('authentication', token, { maxAge }).json({ store, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postLogout = async (req, res) => {
  try {
    req.store.tokens = req.store.tokens.filter(
      token => token.token !== req.token
    );
    await req.store.save();
    res
      .clearCookie('authentication')
      .json({ message: 'store logged out successfully' });
  } catch (error) {
    res.status(200).json({ message: 'store logging out failed' });
  }
};

const getStore = async (req, res) => {
  try {
    const store = await Store.findOne({ username: req.params.username });

    if (!store) {
      return res.status(404).json({ message: 'no store was found' });
    }

    await store.populate('products').execPopulate();

    res.json({ store, products: store.products });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  postRegister,
  postLogin,
  postLogout,
  getStore,
};
