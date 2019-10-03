const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },

  store: {
    type: ObjectId,
    ref: 'Store',
  },

  products: [
    {
      type: ObjectId,
      ref: 'Product',
    },
  ],

  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
    required: true,
  },
});

const Bundle = model('Bundle', schema);

module.exports = Bundle;
