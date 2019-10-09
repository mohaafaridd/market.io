const Cart = require('../../models/cart.model');

const getCart = async (req, res) => {
  const { client: user } = req;
  const { role } = user;

  const cart = await Cart.aggregate([
    { $match: { user: user._id, ordered: false } },

    // Step 1: Look for the bundle
    {
      $lookup: {
        from: 'bundles',
        localField: 'bundle',
        foreignField: '_id',
        as: 'bundle',
      },
    },

    // Step 2: Clear if no bundle
    {
      $unwind: {
        path: '$bundle',
        preserveNullAndEmptyArrays: true,
      },
    },

    // Step 3: Move product id from bundle array to product property
    {
      $project: {
        bundle: '$bundle',
        amount: '$amount',
        product: { $ifNull: ['$product', '$bundle.products'] },
      },
    },

    // Step 4: Separate the array if exists
    {
      $unwind: {
        path: '$product',
        preserveNullAndEmptyArrays: true,
      },
    },

    // Step 5: Look for product
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'product',
      },
    },

    // Step 6: Moves the project out of the array
    {
      $unwind: {
        path: '$product',
        preserveNullAndEmptyArrays: true,
      },
    },

    // Step 6.1: Get product store
    {
      $lookup: {
        from: 'stores',
        localField: 'product.store',
        foreignField: '_id',
        as: 'store',
      },
    },

    // Step 6.2: Move store out of the array
    {
      $unwind: {
        path: '$store',
        preserveNullAndEmptyArrays: true,
      },
    },

    // Step 7: Project to calculate Bill
    {
      $project: {
        bundle: '$bundle',
        amount: '$amount',
        product: '$product',
        store: '$store',
        bill: {
          $multiply: [
            '$amount',
            '$product.price',
            {
              $subtract: [
                1,
                {
                  $divide: [
                    { $ifNull: ['$bundle.discount', '$product.discount'] },
                    100,
                  ],
                },
              ],
            },
          ],
        },
      },
    },

    // Step 8: Group all products within their bundles
    {
      $group: {
        _id: '$bundle._id',
        bill: { $sum: '$bill' },
        bundle: { $first: '$bundle' },
        amount: { $first: '$amount' },
        products: {
          $push: {
            product: '$product',
            store: '$store',
            bundle: '$bundle',
            amount: '$amount',
            bill: '$bill',
            discount: { $ifNull: ['$bundle.discount', '$product.discount'] },
          },
        },
      },
    },
  ]);

  const bill = cart.reduce((a, b) => a + b.bill, 0);
  // console.log('cart :', JSON.stringify(cart, undefined, 2));

  res.render('user/cart', { title: 'Shopping Cart', [role]: true, cart, bill });
};

module.exports = {
  getCart,
};
