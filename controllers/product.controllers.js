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
    res.status(404).json({ error: error.message });
  }
};

const patchProduct = async (req, res) => {
  try {
    const updates = Object.keys(req.body.updates);

    const allowedUpdates = [
      'category',
      'manufacturer',
      'name',
      'description',
      'model',
      'color',
      'amount',
      'discount',
    ];

    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      throw new Error('Invalid key to update');
    }

    const product = await Product.findOne({
      _id: req.params.id,
      store: req.store._id,
    });

    if (!product) {
      throw new Error('No product was found');
    }

    updates.forEach(update => {
      product[update] = req.body.updates[update];
    });

    await product.save();

    res.json({
      success: true,
      message: 'Product was updated',
      product,
    });
  } catch (error) {
    res.json('Failed');
  }
};

module.exports = {
  postProduct,
  getProduct,
  patchProduct,
};
