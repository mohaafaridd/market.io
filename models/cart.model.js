const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const schema = new Schema({
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

const Cart = model('Cart', schema);

module.exports = Cart;
