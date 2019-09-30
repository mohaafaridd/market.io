const Cart = require('../../../models/cart.model');
const accounting = require('accounting');

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

const statisticsParser = statistics => ({
  revenue: accounting.formatMoney(statistics.revenue),
  sold: accounting.formatNumber(statistics.sold),
});

const productsParser = products => {
  return products.map(product => ({
    ...product,
    discount: accounting.formatMoney(product.product.discount),
    revenue: accounting.formatMoney(product.revenue),
    price: accounting.formatMoney(product.price),
  }));
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

  const parsed = statisticsParser(statistics[0]);

  return parsed;
};

const getProducts = async store => {
  const products = await Cart.aggregate(dashboardQuery(store));
  const parsed = productsParser(products);
  return parsed;
};

module.exports = {
  getStatistics,
  getProducts,
};
