const Product = require('../models/product.model');
const Bundle = require('../models/bundle.model');

// @route       POST api/stores/statistics
// @desc        Get store statistics
// @access      Private
const getStatistics = async (req, res) => {
  // TODO: Aggregation to get the following
  // 1 - Products count (ref: products)
  // 2 - Bundles count (ref: bundles)
  // 3 - Total Sales (ref: orders)
  // 4 - Net profit (ref: orders)
  // 5 - Products (ref: products)
  // 6 - Bundles (ref: bundles)
  res.json({ message: 'Not done yet' });
};

// @route       POST api/stores/p/:id
// @desc        Get store products
// @access      Public
const getProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.find({ store: id });
    res.json({ success: true, message: 'Search complete', products });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Search failed', error });
  }
};

// @route       POST api/stores/b/:id
// @desc        Get store bundles
// @access      Public
const getBundles = async (req, res) => {
  try {
    const { id } = req.params;
    const bundles = await Bundle.find({ store: id });
    res.json({ success: true, message: 'Search complete', bundles });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Search failed', error });
  }
};

module.exports = {
  getStatistics,
  getProducts,
  getBundles,
};
