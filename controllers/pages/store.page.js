const Store = require('../../models/store.model');
const Cart = require('../../models/cart.model');

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

  const carts = await Cart.find({ store: store.id, ordered: true }).populate(
    'product'
  );

  const statistics = await Cart.aggregate([
    { $match: { store: store._id, ordered: true } },
    {
      $group: {
        _id: '$product',
        sold: { $sum: '$amount' },
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product',
      },
    },
    { $unwind: '$product' },
    {
      $project: {
        revenue: { $multiply: ['$product.price', '$sold'] },
        sold: '$sold',
      },
    },
    {
      $group: {
        _id: null,
        revenue: { $sum: '$revenue' },
        sold: { $sum: '$sold' },
      },
    },
  ]);

  const products = await Cart.aggregate([
    { $match: { store: store._id, ordered: true } },
    {
      $group: {
        _id: '$product',
        sold: { $sum: '$amount' },
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product',
      },
    },
    { $unwind: '$product' },
    {
      $project: {
        product: '$product',
        revenue: { $multiply: ['$product.price', '$sold'] },
        sold: '$sold',
        price: '$product.price',
      },
    },
    { $sort: { sold: -1 } },
  ]);

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
