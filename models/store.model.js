const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Role = require('../middlewares/role');

const schema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 36,
    required: true,
  },

  username: {
    type: String,
    minlength: 2,
    maxlength: 15,
    match: /^[a-zA-Z]+$/,
    required: true,
    unique: true,
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

  role: {
    type: String,
    required: true,
    default: Role.Store,
  },

  rating: {
    type: Number,
    required: true,
    default: 0,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

schema.plugin(uniqueValidator);

// Getting store products if role is store
schema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'store',
});

// Getting store couriers
schema.virtual('couriers', {
  ref: 'Courier',
  localField: '_id',
  foreignField: 'workplace',
});

// Hashing plain text password
schema.pre('save', async function preSave(next) {
  const store = this;
  if (store.isModified('password')) {
    store.password = await bcrypt.hash(store.password, 10);
  }
  next();
});

schema.methods.generateAuthToken = async function generateAuthToken() {
  const store = this;
  const token = jwt.sign(
    { id: store.id.toString(), role: store.role },
    process.env.SECRET_KEY
  );
  store.tokens = store.tokens.concat({ token });
  await store.save();
  return token;
};

// removing password and tokens from response
schema.methods.toJSON = function toJSON() {
  const store = this;
  const storeObject = store.toObject();

  delete storeObject.password;
  delete storeObject.tokens;

  return storeObject;
};

schema.statics.findByCredentials = async ({ email, password }) => {
  const store = await Store.findOne({ email });
  if (!store) {
    throw new Error('Unable to login!');
  }

  const isMatch = await bcrypt.compare(password, store.password);
  if (!isMatch) {
    throw new Error('Unable to login!');
  }

  return store;
};

const Store = model('Store', schema);

module.exports = Store;
