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
    ref: 'Product',
    required: true,
  },

  bundle: {
    type: ObjectId,
    ref: 'Bundle',
    default: null,
  },

  store: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },

  amount: {
    type: Number,
    default: 0,
    min: 1,
  },

  ordered: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Cart = model('Cart', schema);

module.exports = Cart;
