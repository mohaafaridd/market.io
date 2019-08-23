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

  shop: {
    type: ObjectId,
    required: true,
  },
});

const Product = model('Product', schema);

module.exports = Product;
