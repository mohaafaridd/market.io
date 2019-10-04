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
      $group: {
        _id: '$_id',
      },
    },
  ]);
  console.log('cart :', cart);

  res.render('user/cart', { title: 'Shopping Cart', [role]: true, cart });
};

module.exports = {
  getCart,
};
