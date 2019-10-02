const Cart = require('../../../models/cart.model');
const Product = require('../../../models/product.model');
const numeral = require('numeral');

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

  {
    $project: {
      price: '$price',
      sold: '$sold',
      revenue: '$revenue',
      createdAt: '$product.createdAt',
      discount: '$product.discount',
      booked: '$product.booked',
      score: '$product.score',
      amount: '$product.amount',
      score: '$product.score',
      booked: '$product.booked',
      product: '$product',
    },
  },

  { $sort: { 'product.name': -1 } },
];

const getJSONStatistics = async store => {
  const statistics = await Product.aggregate([...getStaticsAggregation(store)]);
  return statistics;
};

//
const statisticsParser = product => ({
  ...product,
  price: numeral(product.price).format('$0,0.00'),
  revenue: numeral(product.revenue).format('$0,0.00'),
  simpleRevenue: numeral(product.revenue).format('0a'),
});

module.exports = {
  getJSONStatistics,
};
