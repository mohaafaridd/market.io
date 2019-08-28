const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const schema = new Schema({
  delivered: {
    type: Boolean,
    required: true,
  },

  owner: {
    type: ObjectId,
    required: true,
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
});

const Order = model('Order', schema);

module.exports = Order;
