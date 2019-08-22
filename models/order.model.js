const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const schema = new Schema({
  delivered: {
    type: Boolean,
    required: true,
  },

  customer: {
    type: ObjectId,
    required: true,
  },

  products: [
    {
      type: ObjectId,
    },
  ],
});

const Order = model('Order', schema);

module.exports = Order;
