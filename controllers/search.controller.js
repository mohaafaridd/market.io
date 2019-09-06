const Product = require('../models/product.model');

const search = async (req, res) => {
  const { name, minimum, maximum, category } = req.query;

  const products = await Product.find(
    { $text: { $search: name } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });

  res.json({ name, minimum, maximum, category, products });
};

module.exports = { search };
