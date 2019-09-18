const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const schema = new Schema({
  product: {
    type: ObjectId,
    required: true,
  },

  user: {
    type: ObjectId,
    required: true,
  },

  store: {
    type: ObjectId,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },
});

const Rating = model('Rating', schema);

module.exports = Rating;
