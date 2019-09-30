const Store = require('../../models/store.model');
const Cart = require('../../models/cart.model');

const { getStatistics, getProducts } = require('./helpers/store.helper');

const getStore = async (req, res) => {
  try {
    const { client } = req;
    const { role } = client;

    const store = await Store.findOne({
      username: req.params.username,
    }).populate('products');

    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: 'No store was found' });
    }

    const storeOwner = store.id.toString() === client._id.toString();

    res.render('store/profile', {
      [role]: true,
      store,
      storeOwner,
      title: store.name,
      username: client.username,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getDashboard = async (req, res) => {
  const { client: store } = req;
  const { role } = store;

  const statistics = await getStatistics(store);

  const products = await getProducts(store);

  res.render('store/dashboard', {
    title: 'Dashboard',
    [role]: true,
    store,
    products,
    statistics,
  });
};

const addProduct = (req, res) => {
  try {
    const { client: store } = req;
    const { role } = store;
    const mode = { type: 'add', button: 'Add Product' };
    res.render('store/add-edit-product', {
      [role]: true,
      mode,
      store,
      title: 'Add Product',
    });
  } catch (error) {
    res.redirect('/');
  }
};

module.exports = {
  getStore,
  getDashboard,
  addProduct,
};
