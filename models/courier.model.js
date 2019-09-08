const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new Schema({
  firstname: {
    type: String,
    minlength: 2,
    maxlength: 15,
    trim: true,
    match: /^[a-zA-Z,.'-]+$/,
    required: true,
  },

  lastname: {
    type: String,
    minlength: 2,
    maxlength: 15,
    trim: true,
    match: /^[a-zA-Z,.'-]+$/,
    required: true,
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

schema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'courier',
});

// Hashing plain text password
schema.pre('save', async function preSave(next) {
  const courier = this;
  if (courier.isModified('password')) {
    courier.password = await bcrypt.hash(courier.password, 10);
  }
  next();
});

schema.methods.generateAuthToken = async function generateAuthToken() {
  const courier = this;
  const token = jwt.sign(
    { id: courier.id.toString(), role: courier.role },
    process.env.SECRET_KEY
  );
  courier.tokens = courier.tokens.concat({ token });
  await courier.save();
  return token;
};

// removing password and tokens from response
schema.methods.toJSON = function toJSON() {
  const courier = this;
  const courierObject = courier.toObject();

  delete courierObject.password;
  delete courierObject.tokens;

  return courierObject;
};

schema.statics.findByCredentials = async ({ email, password }) => {
  const courier = await Courier.findOne({ email });
  if (!courier) {
    throw new Error('Unable to login!');
  }

  const isMatch = await bcrypt.compare(password, courier.password);
  if (!isMatch) {
    throw new Error('Unable to login!');
  }

  return courier;
};

const Courier = model('Courier', schema);

module.exports = Courier;
