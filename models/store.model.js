const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    unique: true,
    minlength: 2,
    maxlength: 15,
    match: /^[a-zA-Z]+$/,
  },

  phones: [
    {
      type: String,
      match: /^01(\d{9})$/,
    },
  ],

  emails: [
    {
      type: String,
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
  const token = jwt.sign({ _id: store._id.toString() }, process.env.SECRET_KEY);
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

schema.statics.findByCredentials = async (username, password) => {
  const store = await Store.findOne({ username });
  if (!store) {
    throw new Error('Unable to login!');
  }

  const isMatch = await bcrypt.compare(password, store.password);
  if (!isMatch) {
    throw new Error('Unable to login!');
  }

  return store;
};

schema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'store',
});

const Store = model('Store', schema);

module.exports = Store;
