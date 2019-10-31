const Cart = require('../../models/cart.model');

const getBundles = async user => {
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
                      $indexOfArray: ['$bundle.products._id', '$$this.product'],
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
                    $divide: [{ $subtract: [100, '$$product.discount'] }, 100],
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

  return bundles;
};

const getProducts = async user => {
  const products = await Cart.aggregate([
    // Step 1.0: Fetch all products
    {
      $match: {
        user: user._id,
        ordered: false,
        product: { $exists: true, $ne: null },
      },
    },

    // Step 2.0: lookup product
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'product',
      },
    },

    // Step 3.0: Uncompress and delete Empty Products (Not possible in the first place)
    {
      $unwind: {
        path: '$product',
        preserveNullAndEmptyArrays: true,
      },
    },

    // Step 4.0: Calculate bill
    {
      $project: {
        product: '$product',
        store: '$store',
        bill: {
          $sum: {
            $multiply: [
              '$product.price',
              '$amount',
              // discount = 10%
              // then it's 0.9 of the price
              // ((100 - 10)/100)
              {
                $divide: [{ $subtract: [100, '$product.discount'] }, 100],
              },
            ],
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

  return products;
};

module.exports = {
  getBundles,
  getProducts,
};
