const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const schema = new Schema(
  {
    delivered: {
      type: Boolean,
      required: true,
      default: false,
    },

    owner: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },

    products: [
      {
        id: {
          type: ObjectId,
        },
        amount: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const Order = model('Order', schema);

module.exports = Order;
