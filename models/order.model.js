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

    courier: {
      type: ObjectId,
      ref: 'Courier',
    },

    carts: [{ type: ObjectId, ref: 'Cart' }],
  },
  { timestamps: true }
);

const Order = model('Order', schema);

module.exports = Order;
