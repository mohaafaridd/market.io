const Cart = require('../../models/cart.model');

const getCart = async (req, res) => {
  const { client: user } = req;
  const { role } = user;

  const cart = await Cart.aggregate([
    { $match: { user: user._id, ordered: false } },

    // Step 1.1: Look for the bundle
    {
      $lookup: {
        from: 'bundles',
        localField: 'bundle',
        foreignField: '_id',
        as: 'bundle',
      },
    },

    // Step 1.2: Clear if no bundle
    {
      $unwind: {
        path: '$bundle',
        preserveNullAndEmptyArrays: true,
      },
    },

    // Step 2.1: Move product id from bundle array to product property
    {
      $project: {
        cart: '$_id',
        bundle: '$bundle',
        amount: '$amount',
        product: {
          $ifNull: ['$product', '$bundle.products.product'],
        },
      },
    },

    // Step 2.2: Separate the array if exists
    {
      $unwind: {
        path: '$product',
        preserveNullAndEmptyArrays: true,
      },
    },

    // Step 3.1: Look for product
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'product',
      },
    },

    // // Step 3.2: Moves the project out of the array
    {
      $unwind: {
        path: '$product',
        preserveNullAndEmptyArrays: true,
      },
    },

    // Step 4.1: Get product store
    {
      $lookup: {
        from: 'stores',
        localField: 'product.store',
        foreignField: '_id',
        as: 'store',
      },
    },

    // Step 4.2: Move store out of the array
    {
      $unwind: {
        path: '$store',
        preserveNullAndEmptyArrays: true,
      },
    },

    // Step 5.1: Get product details from bundle (TO EXTRACT DISCOUNT)
    {
      $project: {
        amount: '$amount',
        bundle: '$bundle',
        cart: '$cart',
        product: '$product',
        store: '$store',
        details: {
          $filter: {
            input: '$bundle.products',
            as: 'cart',
            cond: { $eq: ['$product._id', '$$cart.product'] },
          },
        },
      },
    },

    // Step 5.2: Add discount property
    {
      $project: {
        amount: '$amount',
        bundle: '$bundle',
        cart: '$cart',
        product: '$product',
        store: '$store',
        discount: { $ifNull: ['$details.discount', '$product.discount'] },
      },
    },

    // Step 5.3: Extract array element
    {
      $unwind: {
        path: '$discount',
        preserveNullAndEmptyArrays: true,
      },
    },

    // Step 5.4: Change discount into fraction
    {
      $project: {
        amount: '$amount',
        bundle: '$bundle',
        cart: '$cart',
        discount: '$discount',
        product: '$product',
        store: '$store',
        saved: {
          $divide: ['$discount', 100],
        },
        fraction: {
          $subtract: [
            1,
            {
              $divide: ['$discount', 100],
            },
          ],
        },
      },
    },

    // Step 6: Project to calculate Bill
    {
      $project: {
        amount: '$amount',
        bundle: '$bundle',
        cart: '$cart',
        discount: '$discount',
        product: '$product',
        store: '$store',
        saved: { $multiply: ['$amount', '$product.price', '$saved'] },
        bill: { $multiply: ['$amount', '$product.price', '$fraction'] },
      },
    },

    // Step 7: Group all products within their bundles
    {
      $group: {
        _id: '$bundle._id',
        amount: { $first: '$amount' },
        bill: { $sum: '$bill' },
        bundle: { $first: '$bundle' },
        cart: { $first: '$cart' },
        saved: { $sum: '$saved' },
        products: {
          $push: {
            cart: '$cart',
            product: '$product',
            store: '$store',
            bundle: '$bundle',
            amount: '$amount',
            bill: '$bill',
            discount: '$discount',
            saved: '$saved',
          },
        },
      },
    },
  ]);

  const bill = cart.reduce((a, b) => a + b.bill, 0);

  res.render('user/cart', { title: 'Shopping Cart', [role]: true, cart, bill });
};

module.exports = {
  getCart,
};
