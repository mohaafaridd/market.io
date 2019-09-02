const Product = require('../models/product.model');
const sharp = require('sharp');

const postProduct = async (req, res) => {
  console.log(req);
  const product = new Product({ ...req.body.product, store: req.user.id });
  try {
    await product.save();
    res.status(201).json({ message: 'product added', product });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const postProductPicture = async (req, res) => {
  try {
    const buffer = await sharp(req.file.buffer)
      .png()
      .resize({ width: 300, height: 300 })
      .toBuffer();
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        picture: buffer,
      },
      { new: true }
    );

    res.json({ product });
  } catch (error) {
    res.json({ message: 'Upload failed' });
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
      store: req.user.id,
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
      store: req.user.id,
    });

    if (!product) {
      return res.status(404).json({ message: 'No product was found' });
    }

    res.status(200).json({ message: 'product was deleted', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  postProduct,
  postProductPicture,
  getProduct,
  patchProduct,
  deleteProduct,
};
