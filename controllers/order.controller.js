const mongoose = require('mongoose');
const Cart = require('../models/cart.model');
const Order = require('../models/order.model');

// @route       POST api/orders
// @desc        Create an order
// @access      Private
const postOrder = async (req, res) => {
  try {
    const { client: user } = req;
    const carts = await Cart.find({ user: user.id, ordered: false });
    if (carts.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: 'You have no products in your cart' });
    }
    const ids = carts.map(cart => cart.id);
    const order = new Order({ user: user._id, carts: ids });
    await order.save();
    await Cart.updateMany({ _id: { $in: ids } }, { $set: { ordered: true } });
    res.status(201).json({
      success: true,
      message: 'You order has been set',
      payload: order,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route       GET api/orders/:id
// @desc        Gets an order details
// @access      Private
const getOrder = async (req, res) => {
  try {
    const { client: user } = req;
    const { id } = req.params;
    const order = await Order.aggregate([
      {
        $match: {
          $and: [{ _id: mongoose.Types.ObjectId(id) }, { user: user._id }],
        },
      },
      //   { $unwind: '$carts' },
      {
        $lookup: {
          from: 'carts',
          localField: 'carts',
          foreignField: '_id',
          as: 'cart',
        },
      },
      { $unwind: '$cart' },
      {
        $lookup: {
          from: 'products',
          localField: 'cart.product',
          foreignField: '_id',
          as: 'cart.product',
        },
      },
      { $unwind: '$cart.product' },
      {
        $lookup: {
          from: 'stores',
          localField: 'cart.store',
          foreignField: '_id',
          as: 'cart.store',
        },
      },
      { $unwind: '$cart.store' },
      {
        $group: {
          _id: '$_id',
          amount: { $sum: '$cart.amount' },
          carts: { $push: '$cart' },
        },
      },
    ]);
    res.send(order);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  postOrder,
  getOrder,
};
