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
    ref: 'User',
  },

  amount: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
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

schema.index({ name: 'text' });

const Product = model('Product', schema);

module.exports = Product;
