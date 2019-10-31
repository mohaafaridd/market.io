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

    // bundles: contained all bundles user has added in his cart
    const bundles = await Cart.aggregate([
      // Step 1.0: Fetch all bundles
      {
        $match: {
          user: user._id,
          ordered: false,
          bundle: { $exists: true, $ne: null },
        },
      },

      // Step 2.0: lookup bundles to get products
      {
        $lookup: {
          from: 'bundles',
          localField: 'bundle',
          foreignField: '_id',
          as: 'bundle',
        },
      },

      // Step 3.0: Uncompress and delete Empty Bundles (Not possible in the first place)
      {
        $unwind: {
          path: '$bundle',
          preserveNullAndEmptyArrays: true,
        },
      },

      // Step 4.0: lookup for offers to get products
      {
        $lookup: {
          from: 'products',
          localField: 'bundle.offers.product',
          foreignField: '_id',
          as: 'bundle.products',
        },
      },

      // This query came from https://stackoverflow.com/a/47994330/11781188 for reference
      // Step 5.0: Merge products and their discount offers
      {
        $addFields: {
          products: {
            // Maps the offers to get their product id and offer discount and merge it with the original product
            $map: {
              input: '$bundle.offers',
              in: {
                $mergeObjects: [
                  {
                    $arrayElemAt: [
                      '$bundle.products',
                      {
                        $indexOfArray: [
                          '$bundle.products._id',
                          '$$this.product',
                        ],
                      },
                    ],
                  },
                  '$$this',
                ],
              },
            },
          },
        },
      },

      // This query loops over the products array to calculate the proper discount on the bundle's products
      // Step 6.0: Calculate bill
      {
        $project: {
          products: '$products',
          store: '$store',
          bill: {
            $sum: {
              $map: {
                input: '$products',
                as: 'product',
                in: {
                  $multiply: [
                    '$$product.price',
                    '$amount',
                    // discount = 10%
                    // then it's 0.9 of the price
                    // ((100 - 10)/100)
                    {
                      $divide: [
                        { $subtract: [100, '$$product.discount'] },
                        100,
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
      },

      {
        $lookup: {
          from: 'users',
          localField: 'store',
          foreignField: '_id',
          as: 'store',
        },
      },

      {
        $unwind: {
          path: '$store',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    res.json({
      success: true,
      message: 'Carts found!',
      bundles,
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
