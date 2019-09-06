const Product = require('../models/product.model');

const getProducts = async (req, res) => {
  const { category, name, minimum = 0, maximum = 1000000, page } = req.query;

  if (minimum > maximum) {
    return res
      .status(400)
      .json({ message: "minimum can't be more than maximum" });
  }

  const matchQuery = {
    $and: [
      name ? { $text: { $search: name } } : { name: { $exists: true } },
      {
        price: {
          $gte: parseFloat(minimum),
          $lte: parseFloat(maximum),
        },
      },
      { category: category ? category : { $exists: true } },
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
