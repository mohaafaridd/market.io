const Product = require('../models/product.model');

const getProducts = async (req, res) => {
  const {
    category,
    name,
    minimum = 0,
    maximum = 1000000,
    page,
    minRating = 0,
    maxRating = 5,
  } = req.query;

  if (minimum > maximum) {
    return res
      .status(400)
      .json({ message: "minimum can't be more than maximum" });
  }

  if (minRating > maxRating) {
    return res
      .status(400)
      .json({ message: "minimum rating can't be more than maximum" });
  }

  if (minRating < 0 || minRating > 5 || maxRating < 0 || maxRating > 5) {
    return res.status(400).json({ message: 'bad rating value' });
  }

  const matchQuery = {
    $and: [
      // if a name is passed as a query param it will be used for search
      // if not the query will just check for name availability in the document
      name ? { $text: { $search: name } } : { name: { $exists: true } },
      {
        price: {
          $gte: parseFloat(minimum),
          $lte: parseFloat(maximum),
        },
      },
      { category: category ? category : { $exists: true } },

      {
        rating: {
          $gte: parseFloat(minRating),
          $lte: parseFloat(maxRating),
        },
      },
    ],
  };

  const products = await Product.find(matchQuery, {
    score: { $meta: 'textScore' },
  })
    .sort({ score: { $meta: 'textScore' } })
    .limit(10)
    .skip(page ? page - 1 : 0);

  const count = await Product.find(matchQuery).countDocuments();

  res.json({ products, count });
};

module.exports = { getProducts };
