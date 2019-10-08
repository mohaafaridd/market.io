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
        cart: '$_id',
        amount: '$amount',
        bill: {
          // amount * productPrice * ( !bundle ? productDiscount  )
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
        bundle: '$bundle',
        product: '$product',
        store: '$store',
      },
    },

    {
      $group: {
        _id: '$bundle._id',
        bill: { $sum: '$bill' },
        bundle: { $first: '$bundle' },
        amount: { $first: '$amount' },

        products: {
          $push: {
            cart: '$cart',
            product: '$product',
            bundle: '$bundle',
            amount: '$amount',
            bill: '$bill',
            store: '$store',
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
