const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const schema = new Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
    trim: true,
    match: /^[a-zA-Z]+$/
  },

  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
    trim: true,
    match: /^[a-zA-Z]+$/
  },

  phone: {
    type: String,
    required: true,
    match: /^01(\d{9})$/
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!isEmail(value)) {
        throw new Error('Invalid Email');
      }
    }
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100
  }
});

const User = model('User', schema);

module.exports = User;
