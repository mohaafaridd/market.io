const Product = require('../models/product.model');
const Bundle = require('../models/bundle.model');
const Order = require('../models/order.model');

// @route       POST api/stores/statistics
// @desc        Get store statistics
// @access      Private
const getStatistics = async (req, res) => {
  // TODO: Aggregation to get the following
  // 1 - Products count (ref: products)
  // 2 - Bundles count (ref: bundles)
  // 3 - Total Sales (ref: orders)
  // 4 - Net profit (ref: orders)
  // 5 - Products (ref: products)
  // 6 - Bundles (ref: bundles)
  try {
    const { client: store } = req;
    const statistics = await Order.aggregate([
      { $match: { store: store._id } },
      {
        $group: {
          _id: null,
          bundles: {
            $sum: {
              $cond: {
                if: { $ne: ['$bundle', null] },
                then: '$amount',
                else: 0,
              },
            },
          },

          sellingGraph: {
            $push: {
              type: {
                $cond: {
                  if: { $eq: ['$bundle', null] },
                  then: 'product',
                  else: 'bundle',
                },
              },
              amount: '$amount',
              date: '$createdAt',
            },
          },

          profitGraph: {
            $push: {
              type: {
                $cond: {
                  if: { $eq: ['$bundle', null] },
                  then: 'product',
                  else: 'bundle',
                },
              },

              profit: {
                $multiply: [
                  '$amount',
                  '$price',
                  {
                    $subtract: [
                      1,
                      {
                        $divide: ['$discount', 100],
                      },
                    ],
                  },
                ],
              },

              date: '$createdAt',
            },
          },

          bundleProfit: {
            $sum: {
              $cond: {
                if: { $ne: ['$bundle', null] },
                then: {
                  $multiply: [
                    '$amount',
                    '$price',
                    {
                      $subtract: [
                        1,
                        {
                          $divide: ['$discount', 100],
                        },
                      ],
                    },
                  ],
                },
                else: 0,
              },
            },
          },

          products: {
            $sum: {
              $cond: {
                if: { $eq: ['$bundle', null] },
                then: '$amount',
                else: 0,
              },
            },
          },

          productProfit: {
            $sum: {
              $cond: {
                if: { $eq: ['$bundle', null] },
                then: {
                  $multiply: [
                    '$amount',
                    '$price',
                    {
                      $subtract: [
                        1,
                        {
                          $divide: ['$discount', 100],
                        },
                      ],
                    },
                  ],
                },
                else: 0,
              },
            },
          },
        },
      },

      {
        $project: {
          bundles: '$bundles',
          products: '$products',
          profit: {
            products: '$productProfit',
            bundles: '$bundleProfit',
            total: { $sum: ['$productProfit', '$bundleProfit'] },
          },
          graph: {
            amount: {
              product: {
                $filter: {
                  input: '$sellingGraph',
                  as: 'trade',
                  cond: { $eq: ['$$trade.type', 'product'] },
                },
              },
              bundle: {
                $filter: {
                  input: '$sellingGraph',
                  as: 'trade',
                  cond: { $eq: ['$$trade.type', 'bundle'] },
                },
              },
            },
            profit: {
              product: {
                $filter: {
                  input: '$profitGraph',
                  as: 'trade',
                  cond: { $eq: ['$$trade.type', 'product'] },
                },
              },
              bundle: {
                $filter: {
                  input: '$profitGraph',
                  as: 'trade',
                  cond: { $eq: ['$$trade.type', 'bundle'] },
                },
              },
            },
          },
        },
      },
    ]);
    res
      .status(200)
      .json({
        success: true,
        message: 'Statistics fetched successfully',
        statistics,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, error });
  }
};

// @route       POST api/stores/p/:id
// @desc        Get store products
// @access      Public
const getProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.find({ store: id });
    res.json({ success: true, message: 'Search complete', products });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Search failed', error });
  }
};

// @route       POST api/stores/b/:id
// @desc        Get store bundles
// @access      Public
const getBundles = async (req, res) => {
  try {
    const { id } = req.params;
    const bundles = await Bundle.find({ store: id });
    res.json({ success: true, message: 'Search complete', bundles });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Search failed', error });
  }
};

module.exports = {
  getStatistics,
  getProducts,
  getBundles,
};
