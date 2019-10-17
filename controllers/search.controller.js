const Product = require('../models/product.model');
const Bundle = require('../models/bundle.model');

// TODO: Needs test
/* Query Options */
// 00 - Search by name
// 01 - Select category
// 02 - Select color
// 03 - Select manufacturer
// 04 - Select maximum price
// 05 - Select minimum price
// 06 - Select maximum rating
// 07 - Select minimum rating
// 08 - Select only products (type)
// 09 - Select only bundles (type)
// 10 - Select both bundle and products (default type)
// 11 - Select page (defaults at 1)

// @route       GET api/search
// @desc        Search for bundles or products
// @access      Public
const search = async (req, res) => {
  const {
    name,
    category,
    color,
    manufacturer,
    maxPrice,
    minPrice,
    maxRating,
    minRating,
    type,
    page,
  } = req.query;

  try {
    const products = await Product.aggregate([
      {
        $match: {
          $and: [
            name ? { $text: { $search: name } } : { name: { $exists: true } },
            category ? { category: category } : { category: { $exists: true } },
            color ? { color: color } : { color: { $exists: true } },
            manufacturer
              ? { manufacturer: manufacturer }
              : { manufacturer: { $exists: true } },
            maxPrice
              ? { price: { $lte: maxPrice } }
              : { price: { $exists: true } },
            minPrice
              ? { price: { $gte: minPrice } }
              : { price: { $exists: true } },
            maxRating
              ? { score: { $lte: maxRating } }
              : { score: { $exists: true } },
            minRating
              ? { score: { $gte: minRating } }
              : { score: { $exists: true } },
          ],
        },
      },

      {
        // -1 to get from page 1
        $skip: 10 * (page - 1),
      },
    ]);

    res.json({ products });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  search,
};
