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
  },

  bundle: {
    type: ObjectId,
    ref: 'Bundle',
  },

  store: {
    type: ObjectId,
    required: true,
    ref: 'Store',
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
