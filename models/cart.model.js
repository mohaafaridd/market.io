const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const schema = new Schema({
  owner: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },

  id: {
    type: ObjectId,
  },

  amount: {
    type: Number,
    default: 0,
  },
});

const Cart = model('Cart', schema);

module.exports = Cart;
