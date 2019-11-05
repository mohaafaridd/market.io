const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const schema = new Schema(
  {
    delivered: {
      type: Boolean,
      required: true,
      default: false,
    },

    user: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },

    product: {
      type: ObjectId,
      required: true,
      ref: 'Product',
    },

    bundle: {
      type: ObjectId,
      ref: 'Bundle',
    },

    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    cart: {
      type: ObjectId,
      required: true,
      ref: 'Cart',
    },

    store: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Order = model('Order', schema);

module.exports = Order;
