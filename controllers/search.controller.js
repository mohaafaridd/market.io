const Product = require('../models/product.model');

const search = async (req, res) => {
  const { name, minimum, maximum, category } = req.query;

  const query = {
    $and: [
      { $text: { $search: name } },
      { category: category ? category : { $exists: true } },
      { price: { $gte: minimum < maximum ? minimum : 0 } },
      { price: { $lte: maximum } },
    ],
  };

  const products = await Product.find(query, {
    score: { $meta: 'textScore' },
  }).sort({ score: { $meta: 'textScore' } });

  res.json({ products });
};

module.exports = { search };
