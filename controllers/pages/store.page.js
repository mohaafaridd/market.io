const Store = require('../../models/store.model');
const Cart = require('../../models/cart.model');

const { dashboardQuery } = require('./helpers/store.helper');

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
  const { client } = req;
  const { role } = client;
  const store = await Store.findById(client.id).populate('products');

  const statistics = await Cart.aggregate([
    ...dashboardQuery(store),
    {
      $group: {
        _id: null,
        revenue: { $sum: '$revenue' },
        sold: { $sum: '$sold' },
      },
    },
  ]);

  const products = await Cart.aggregate(dashboardQuery(store));

  res.render('store/dashboard', {
    title: 'Dashboard',
    [role]: true,
    store,
    products,
    stats: statistics[0],
  });
};

module.exports = {
  getStore,
  getDashboard,
};
