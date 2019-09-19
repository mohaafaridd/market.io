const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const schema = new Schema({
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

  store: {
    type: ObjectId,
    required: true,
    ref: 'Store',
  },

  amount: {
    type: Number,
    required: true,
    default: 0,
    min: 1,
  },
});

const Cart = model('Cart', schema);

module.exports = Cart;
