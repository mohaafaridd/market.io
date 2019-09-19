const Product = require('../models/product.model');

const getProducts = async (req, res) => {
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

  if (minimum > maximum) {
    return res
      .status(400)
      .json({ success: false, message: "Minimum can't be more than maximum" });
  }

  if (minRating > maxRating) {
    return res.status(400).json({
      success: false,
      message: "Minimum rating can't be more than maximum",
    });
  }

  if (minRating < 0 || minRating > 5 || maxRating < 0 || maxRating > 5) {
    return res.status(400).json({ success: false, message: 'Invalid ratings' });
  }

  const matchQuery = {
    $and: [
      // if a name is passed as a query param it will be used for search
      // if not the query will just check for name availability in the document
      name ? { $text: { $search: name } } : { name: { $exists: true } },
      { color: color ? color : { $exists: true } },
      { manufacturer: manufacturer ? manufacturer : { $exists: true } },
      { category: category ? category : { $exists: true } },
      {
        price: {
          $gte: parseFloat(minimum),
          $lte: parseFloat(maximum),
        },
      },
      {
        score: {
          $gte: parseFloat(minRating),
          $lte: parseFloat(maxRating),
        },
      },
    ],
  };

  try {
    const products = await Product.find(matchQuery, {
      matchScore: { $meta: 'textScore' },
    })
      .populate('store')
      .sort({ matchScore: { $meta: 'textScore' } })
      .limit(10)
      .skip(page ? page - 1 : 0);

    const count = await Product.find(matchQuery).countDocuments();

    res.render('general/search', {
      success: true,
      message: 'Search completed',
      products,
      count,
    });
  } catch (error) {
    res.json({ success: false, message: 'Search failed' });
  }
};

module.exports = { getProducts };
