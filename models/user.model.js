const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const role = require('../middlewares/role');

const schema = new Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
    trim: true,
    match: /^[a-zA-Z]+$/,
  },

  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
    trim: true,
    match: /^[a-zA-Z]+$/,
  },

  username: {
    type: String,
    unique: true,
    minlength: 2,
    maxlength: 15,
    match: /^[a-zA-Z]+$/,
  },

  phone: {
    type: String,
    required: true,
    match: /^01(\d{9})$/,
    unique: true,
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
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],

  role: {
    type: String,
    required: true,
  },
});

schema.plugin(uniqueValidator);

// Getting user orders
schema.virtual('cart', {
  ref: 'Cart',
  localField: '_id',
  foreignField: 'owner',
});

// Getting user orders
schema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'customer',
});

// Getting user products if role is store
schema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'store',
});
// Hashing plain text password
schema.pre('save', async function preSave(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

schema.methods.generateAuthToken = async function generateAuthToken() {
  const user = this;
  const token = jwt.sign(
    { id: user.id.toString(), role: user.role },
    process.env.SECRET_KEY
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// removing password and tokens from response
schema.methods.toJSON = function toJSON() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

schema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Unable to login!');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login!');
  }

  return user;
};

const User = model('User', schema);

module.exports = User;
