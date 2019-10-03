const moment = require('moment');
const numeral = require('numeral');
const Product = require('../../../models/product.model');
const Bundle = require('../../../models/bundle.model');
const getStaticsAggregation = store => [
  // Get store products
  { $match: { store: store._id } },
  // group by id
  {
    $group: {
      _id: '$_id',
      price: { $sum: '$price' },
    },
  },
  // find carts of this product
  {
    $lookup: {
      from: 'carts',
      localField: '_id',
      foreignField: 'product',
      as: 'carts',
    },
  },
  // filter for ordered carts only
  {
    $project: {
      carts: {
        $filter: {
          input: '$carts',
          as: 'cart',
          cond: { $eq: ['$$cart.ordered', true] },
        },
      },
      price: '$price',
    },
  },
  // export price, sold units count and total revenue of each product
  {
    $project: {
      price: '$price',
      sold: { $sum: '$carts.amount' },
      revenue: { $multiply: [{ $sum: '$carts.amount' }, '$price'] },
    },
  },
  // get product details
  {
    $lookup: {
      from: 'products',
      localField: '_id',
      foreignField: '_id',
      as: 'product',
    },
  },

  { $unwind: '$product' },

  { $sort: { 'product.name': -1 } },
];

const getJSONStatistics = async store => {
  const statistics = await Product.aggregate([...getStaticsAggregation(store)]);
  return statistics;
};

const getJSONTopSellers = async (store, limit = 5) => {
  const statistics = await Product.aggregate([
    ...getStaticsAggregation(store),
    { $sort: { sold: -1 } },
    { $limit: limit },
  ]);
  return statistics;
};

const statisticsParser = product => ({
  ...product,
  price: numeral(product.price).format('$0,0.00'),
  revenue: numeral(product.revenue).format('$0,0.00'),
  simpleRevenue: numeral(product.revenue).format('0a'),
  createdAt: moment(product.product.createdAt).format('LLL'),
  picture: Buffer.from(product.product.picture.buffer, 'binary').toString(
    'base64'
  ),
});

const getJSONBundle = async store => {
  try {
    const bundles = await Bundle.find({ store: store.id });
    return bundles;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getJSONStatistics,
  getJSONTopSellers,
  statisticsParser,
  getJSONBundle,
};
