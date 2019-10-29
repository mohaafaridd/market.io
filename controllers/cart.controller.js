const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const Bundle = require('../models/bundle.model');

// @route       POST api/carts
// @desc        Create a cart
// @access      Private
const postCart = async (req, res) => {
  try {
    const { client: user } = req;
    const { product = null, bundle = null } = req.body;

    const item = product
      ? await Product.findById(product)
      : await Bundle.findById(bundle);

    if (!item) {
      throw new Error('Item was not found');
    }

    // TODO: Check for stock
    // TODO: Change booking
    const type = product ? 'product' : 'bundle';
    const cart = await Cart.findOneAndUpdate(
      { user: user._id, product, bundle, ordered: false, store: item.store },
      { $inc: { amount: 1 } },
      {
        context: 'query',
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        upsert: true,
      }
    );

    res.json({
      success: true,
      message: `You have added a ${type} to your cart`,
      payload: cart,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route       PATCH api/carts/:id
// @desc        Update a cart
// @access      Private
const updateCart = async (req, res) => {
  try {
    const { client: user } = req;
    const { amount } = req.body;
    const { id } = req.params;

    // TODO: Check for stock
    // TODO: Change booking

    const cart = await Cart.findOneAndUpdate(
      {
        _id: id,
        user: user._id,
        ordered: false,
      },
      { $set: { amount } },
      { context: 'query', runValidators: true, new: true }
    );

    const type = cart.bundle ? 'bundle' : 'product';

    res.json({
      success: true,
      message: `You have updated your ${type} amount`,
      payload: cart,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route       GET api/carts/
// @desc        Gets user carts
// @access      Private
const getCarts = async (req, res) => {
  try {
    const { client: user } = req;
    const { role } = user;

    const carts = await Cart.find({ user: user._id })
      .populate('product')
      .populate('bundle');

    // const cart = await Cart.aggregate([
    //   { $match: { user: user._id, ordered: false } },

    //   // Step 1.1: Look for the bundle
    //   {
    //     $lookup: {
    //       from: 'bundles',
    //       localField: 'bundle',
    //       foreignField: '_id',
    //       as: 'bundle',
    //     },
    //   },

    //   // Step 1.2: Clear if no bundle
    //   {
    //     $unwind: {
    //       path: '$bundle',
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },

    //   // Step 2.1: Move product id from bundle array to product property
    //   {
    //     $project: {
    //       cart: '$_id',
    //       bundle: '$bundle',
    //       amount: '$amount',
    //       product: {
    //         $ifNull: ['$product', '$bundle.products.product'],
    //       },
    //     },
    //   },

    //   // Step 2.2: Separate the array if exists
    //   {
    //     $unwind: {
    //       path: '$product',
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },

    //   // Step 3.1: Look for product
    //   {
    //     $lookup: {
    //       from: 'products',
    //       localField: 'product',
    //       foreignField: '_id',
    //       as: 'product',
    //     },
    //   },

    //   // Step 3.2: Moves the project out of the array
    //   {
    //     $unwind: {
    //       path: '$product',
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },

    //   // Step 4.1: Get product store
    //   {
    //     $lookup: {
    //       from: 'stores',
    //       localField: 'product.store',
    //       foreignField: '_id',
    //       as: 'store',
    //     },
    //   },

    //   // Step 4.2: Move store out of the array
    //   {
    //     $unwind: {
    //       path: '$store',
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },

    //   // Step 5.1: Get product details from bundle (TO EXTRACT DISCOUNT)
    //   {
    //     $project: {
    //       amount: '$amount',
    //       bundle: '$bundle',
    //       cart: '$cart',
    //       product: '$product',
    //       store: '$store',
    //       details: {
    //         $filter: {
    //           input: '$bundle.products',
    //           as: 'cart',
    //           cond: { $eq: ['$product._id', '$$cart.product'] },
    //         },
    //       },
    //     },
    //   },

    //   // Step 5.2: Add discount property
    //   {
    //     $project: {
    //       amount: '$amount',
    //       bundle: '$bundle',
    //       cart: '$cart',
    //       product: '$product',
    //       store: '$store',
    //       discount: { $ifNull: ['$details.discount', '$product.discount'] },
    //     },
    //   },

    //   // Step 5.3: Extract array element
    //   {
    //     $unwind: {
    //       path: '$discount',
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },

    //   // Step 5.4: Change discount into fraction
    //   {
    //     $project: {
    //       amount: '$amount',
    //       bundle: '$bundle',
    //       cart: '$cart',
    //       discount: '$discount',
    //       product: '$product',
    //       store: '$store',
    //       saved: {
    //         $divide: ['$discount', 100],
    //       },
    //       fraction: {
    //         $subtract: [
    //           1,
    //           {
    //             $divide: ['$discount', 100],
    //           },
    //         ],
    //       },
    //     },
    //   },

    //   // Step 6: Project to calculate Bill
    //   {
    //     $project: {
    //       amount: '$amount',
    //       bundle: '$bundle',
    //       cart: '$cart',
    //       discount: '$discount',
    //       product: '$product',
    //       store: '$store',
    //       saved: { $multiply: ['$amount', '$product.price', '$saved'] },
    //       bill: { $multiply: ['$amount', '$product.price', '$fraction'] },
    //     },
    //   },

    //   // Step 7: Group all products within their bundles
    //   {
    //     $group: {
    //       _id: '$bundle._id',
    //       amount: { $first: '$amount' },
    //       bill: { $sum: '$bill' },
    //       bundle: { $first: '$bundle' },
    //       cart: { $first: '$cart' },
    //       saved: { $sum: '$saved' },
    //       products: {
    //         $push: {
    //           cart: '$cart',
    //           product: '$product',
    //           store: '$store',
    //           bundle: '$bundle',
    //           amount: '$amount',
    //           bill: '$bill',
    //           discount: '$discount',
    //           saved: '$saved',
    //         },
    //       },
    //     },
    //   },
    // ]);

    // const bill = cart.reduce((a, b) => a + b.bill, 0);

    res.json({
      success: true,
      message: 'Carts found!',
      carts,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route       DELETE api/carts/:id
// @desc        Delete a cart
// @access      Private
const deleteCart = async (req, res) => {
  try {
    const { client: user } = req;
    const { id } = req.params;

    const cart = await Cart.findOneAndRemove({
      _id: id,
      user: user._id,
      ordered: false,
    });

    if (!cart) {
      throw new Error('No cart was found');
    }

    res.json({
      success: true,
      message: 'You have delete your cart',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route       DELETE api/carts/
// @desc        Clear all user's carts
// @access      Private
const clearCart = async (req, res) => {
  try {
    const { client: user } = req;

    const carts = await Cart.deleteMany({
      user: user._id,
      ordered: false,
    });

    res.json({
      success: true,
      message: 'You have cleared your carts',
      carts,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  postCart,
  updateCart,
  deleteCart,
  clearCart,
  getCarts,
};
