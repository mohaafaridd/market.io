const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
    match: /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/,
  },

  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
    match: /^[a-zA-Z]+$/,
  },

  phone: [
    {
      type: String,
      required: true,
      match: /^01(\d{9})$/,
    },
  ],

  email: [
    {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!isEmail(value)) {
          throw new Error('Invalid Email');
        }
      },
    },
  ],

  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
  },
});

schema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'shop',
});

const Shop = model('Shop', schema);

module.exports = Shop;
