const Product = require('../models/product.model');

const getProducts = async (req, res) => {
  const { category, name, minimum = 0, maximum = 1000000 } = req.query;

  if (minimum > maximum) {
    return res
      .status(400)
      .json({ message: "failed, minimum can't be more than maximum" });
  }

  const products = await Product.aggregate([
    {
      $match: {
        $and: [
          name ? { $text: { $search: name } } : { name: { $exists: true } },
          { price: { $gte: parseFloat(minimum), $lte: parseFloat(maximum) } },
          { category: category ? category : { $exists: true } },
        ],
      },
    },
  ]);
  // Working
  // const products = await Product.find(
  //   {
  //     $text: { $search: name },
  //     price: { $gte: minimum, $lte: maximum },
  //   },
  //   { score: { $meta: 'textScore' } }
  // ).sort({ score: { $meta: 'textScore' } });

  res.json({ products });
};

module.exports = { getProducts };
