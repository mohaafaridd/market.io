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

  const aggregation = await Cart.aggregate([
    { $match: { store: store._id } },
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
    { $sort: { revenue: -1 } },
  ]);

  console.log('aggregation :', aggregation);

  const sorted = carts
    .map(cart => ({
      product: cart.product,
      amount: cart.amount,
      income: cart.product.price * cart.amount,
    }))
    .sort((a, b) => (a.income > b.income ? -1 : 1));
  const income = carts.reduce((a, b) => b.product.price * b.amount + a, 0);
  const { products } = store;

  res.render('store/dashboard', {
    title: 'Dashboard',
    [role]: true,
    store,
    carts,
    sorted,
    income,
  });
};

module.exports = {
  getStore,
  getDashboard,
};
