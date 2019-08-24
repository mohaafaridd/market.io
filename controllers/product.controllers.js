const Product = require('../models/product.model');

const postProduct = async (req, res) => {
  const product = new Product({ ...req.body.product, store: req.store._id });

  try {
    await product.save();
    res.status(201).json({ success: true, message: 'product added', product });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new Error('No product was found');
    }

    res.json({
      success: true,
      message: 'Product was found',
      product,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  postProduct,
  getProduct,
};
