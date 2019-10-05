const Cart = require('../../models/cart.model');

const getCart = async (req, res) => {
  const { client: user } = req;
  const { role } = user;
  const cart = await Cart.aggregate([
    { $match: { user: user._id, ordered: false } },
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'product',
      },
    },

    {
      $unwind: {
        path: '$product',
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $lookup: {
        from: 'bundles',
        localField: 'bundle',
        foreignField: '_id',
        as: 'bundle',
      },
    },

    {
      $unwind: {
        path: '$bundle',
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $lookup: {
        from: 'stores',
        localField: 'store',
        foreignField: '_id',
        as: 'store',
      },
    },

    {
      $unwind: {
        path: '$store',
      },
    },

    {
      $project: {
        amount: '$amount',
        bill: {
          $multiply: [
            '$amount',
            '$product.price',
            { $subtract: [1, { $divide: ['$bundle.discount', 100] }] },
          ],
        },
        bundle: '$bundle',
        product: '$product',
        store: '$store',
      },
    },
  ]);
  console.log('cart :', cart);

  res.render('user/cart', { title: 'Shopping Cart', [role]: true, cart });
};

module.exports = {
  getCart,
};
