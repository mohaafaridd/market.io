const Product = require('../models/product.model');

const postProduct = async (req, res) => {
  const product = new Product({ ...req.body.product, store: req.store._id });

  try {
    await product.save();
    res.status(201).json({ message: 'product added', product });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'No product was found' });
    }

    res.status(200).json({
      message: 'Product was found',
      product,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
      return res.status(404).json({ message: 'No product was found' });
    }

    updates.forEach(update => {
      product[update] = req.body.updates[update];
    });

    await product.save();

    res.json({
      message: 'Product was updated',
      product,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      store: req.store._id,
    });

    if (!product) {
      return res.status(404).json({ message: 'No product was found' });
    }

    res.status(400).json({ message: 'product was deleted', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const postToCart = async (req, res) => {
  try {
    const inCart = req.user.cart.filter(item => item === req.body.product._id);
    if (inCart.length > 0) {
      throw new Error('Product is in cart');
    }
    req.user.cart = req.user.cart.concat(req.body.product._id);
    await req.user.save();
    res.json({ message: 'Added to cart' });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const inCart = req.user.cart.filter(item => item === req.body.product._id);
    if (!inCart) {
      throw new Error('Product is not in cart');
    }
    req.user.cart = req.user.cart.filter(item => item !== req.body.product._id);
    await req.user.save();
    res.json({ message: 'Removed from cart' });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  postProduct,
  getProduct,
  patchProduct,
  deleteProduct,
  postToCart,
  deleteFromCart,
};
