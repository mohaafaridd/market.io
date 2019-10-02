const Cart = require('../../../models/cart.model');
const Product = require('../../../models/product.model');
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

const getTopSellers = async store => {
  const statistics = await Product.aggregate([
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
  ]);

  return statistics;
};

const getStatistics = async store => {
  try {
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

    if (!statistics) {
      throw new Error('No Sold Products');
    }

    const parsed = statisticsParser(statistics[0]);

    return parsed;
  } catch (error) {}
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

const getDemandedProducts = async store => {
  try {
    const products = await Cart.aggregate(dashboardQuery(store));
    const parsed = productsParser(products);
    return parsed;
  } catch (error) {}
};

const getProducts = async store => {
  const products = await Product.find({ store: store.id });
  const mapped = products.map(product => ({
    ...product._doc,
    picture: Buffer.from(product.picture).toString('base64'),
  }));
  return mapped;
};

module.exports = {
  getTopSellers,
  getStatistics,
  getDemandedProducts,
  getProducts,
};
