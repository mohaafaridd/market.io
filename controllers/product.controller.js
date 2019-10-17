const Product = require('../models/product.model');

// @route       POST api/products
// @desc        Create a product
// @access      Private
const postProduct = async (req, res) => {
  try {
    const { client: store } = req;
    const product = new Product({ ...req.body, store: store.id });
    await product.save();
    res.status(201).json({
      success: true,
      message: 'You added a product',
      payload: product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route       GET api/products/:id
// @desc        Get product
// @access      Public
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({
      success: true,
      message: 'Product found',
      payload: product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route       PATCH api/products/:id
// @desc        Update a product
// @access      Private
const updateProduct = async (req, res) => {
  try {
    const { client: store } = req;
    const { id } = req.params;

    const {
      category,
      manufacturer,
      name,
      description,
      color,
      amount,
      price,
      discount,
    } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: id, store: store._id },
      {
        category,
        manufacturer,
        name,
        description,
        color,
        amount,
        price,
        discount,
      },
      { context: 'query', runValidators: true, new: true }
    );
    res.status(200).json({
      success: true,
      message: 'Product updated',
      payload: product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route       DELETE api/products/:id
// @desc        Delete a product
// @access      Private
const deleteProduct = async (req, res) => {
  try {
    const { client: store } = req;
    const { id } = req.params;
    await Product.findOneAndRemove({ _id: id, store: store._id });
    res.status(200).json({
      success: true,
      message: 'Product removed',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  postProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
