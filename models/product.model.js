const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const schema = new Schema({
  category: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 36,
  },

  manufacturer: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 36,
  },

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 36,
  },

  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 36,
  },

  model: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 36,
  },

  color: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 36,
  },

  store: {
    type: ObjectId,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  discount: {
    type: Number,
    required: true,
  },

  booked: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },

  picture: {
    type: Buffer,
  },
});

const Product = model('Product', schema);

module.exports = Product;
