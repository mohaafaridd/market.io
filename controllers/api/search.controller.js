const Product = require('../../models/product.model');
const Role = require('../../middlewares/role');
const { query } = require('./helpers/search.helper');

const getProducts = async (req, res, next) => {
  const {
    category,
    color,
    manufacturer,
    maximum = 1000000,
    maxRating = 5,
    minimum = 0,
    minRating = 0,
    name,
    page,
  } = req.query;

  try {
    if (minimum > maximum) {
      throw new Error('Invalid price range');
    }

    if (
      minRating > maxRating ||
      minRating < 0 ||
      minRating > 5 ||
      maxRating < 0 ||
      maxRating > 5
    ) {
      throw new Error('Invalid rating range');
    }

    const matchQuery = query(req.query);

    const products = await Product.find(matchQuery, {
      matchScore: { $meta: 'textScore' },
    })
      .populate('store')
      .sort({ matchScore: { $meta: 'textScore' } })
      .limit(10)
      .skip(page ? page - 1 : 0);
    req.products = products;

    const count = await Product.find(matchQuery).countDocuments();
    req.count = count;

    next();
  } catch (error) {
    res.json({
      success: false,
      message: 'Search failed',
      error: error.message,
    });
  }
};

module.exports = { getProducts };
