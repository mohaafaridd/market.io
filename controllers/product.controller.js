const sharp = require('sharp');

const Product = require('../models/product.model');
const Rating = require('../models/rating.model');

const postProduct = async (req, res) => {
  const { client: store } = req;
  const product = new Product({ ...req.body.product, store: store.id });
  try {
    await product.save();
    res
      .status(201)
      .json({ success: true, message: 'You added a product', product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const patchRate = async (req, res) => {
  const { product, score, store, comment } = req.body;
  const { client: user } = req;

  try {
    const rating = await Rating.findOneAndUpdate(
      { product, user: user.id, store },
      { score, comment },
      { new: true, upsert: true }
    );

    rating.save();

    res.json({ success: true, message: "You've rated this product", rating });
  } catch (error) {
    res.json({ success: false, message: 'Error rating', error: error.message });
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

    res.json({
      success: true,
      message: "You've added a picture to this product",
      product,
    });
  } catch (error) {
    res.json({ success: false, message: 'Upload failed' });
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new Error('No product was found');
    }

    // await product.populate('ratings').execPopulate();
    await product
      .populate({
        populate: {
          path: 'user',
          model: 'User',
        },
        path: 'ratings',
        model: 'Rating',
      })
      .execPopulate();

    console.log('product.ratings :', product.ratings);

    req.product = product;
    next();
    // res.status(200).json({
    //   message: 'Product was found',
    //   product,
    // });
  } catch (error) {
    res
      .status(404)
      .render('error', { message: "We don't have such a product" });
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
      throw new Error('Update Failed');
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'No product was found' });
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
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'No product was found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Product has been deleted', product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  postProduct,
  patchRate,
  postProductPicture,
  getProduct,
  patchProduct,
  deleteProduct,
};
