const Product = require('../models/product.model');

const getProducts = async (req, res) => {
  const { name, minimum = 0, maximum = 1000000 } = req.query;

  const products = await Product.find(
    {
      $text: { $search: name },
      price: { $gte: minimum, $lte: maximum },
    },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  res.json({ products });
};

module.exports = { getProducts };
