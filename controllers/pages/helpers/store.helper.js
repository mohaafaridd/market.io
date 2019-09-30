const Cart = require('../../../models/cart.model');
const accounting = require('accounting');
const numeral = require('numeral');

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
  simpleRevenue: numeral(statistics.revenue).format('0a'),
});

const productsParser = products => {
  return products.map(product => ({
    ...product,
    discount: accounting.formatMoney(product.product.discount),
    revenue: accounting.formatMoney(product.revenue),
    simpleRevenue: numeral(product.revenue).format('0a'),

    price: accounting.formatMoney(product.price),
    simplePrice: numeral(product.price).format('0a'),
  }));
};

const getStatistics = async store => {
  const statistics = await Cart.aggregate([
    ...dashboardQuery(store),
    { $limit: 5 },
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
