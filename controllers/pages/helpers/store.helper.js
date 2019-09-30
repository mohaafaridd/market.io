const Cart = require('../../../models/cart.model');

const dashboardQuery = store => {
  return [
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
  ];
};

const getStatistics = async store => {
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

  return statistics;
};

const getProducts = async store => {
  const products = await Cart.aggregate(dashboardQuery(store));
  return products;
};

module.exports = {
  getStatistics,
  getProducts,
};
