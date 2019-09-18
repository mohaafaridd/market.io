const Product = require('./product.model');

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

  comment: {
    type: String,
    maxlength: 300,
  },
});

schema.post('findOneAndUpdate', async function() {
  // console.log(typeof this._conditions.product.toString());
  const ratings = await Rating.find({
    product: this._conditions.product,
  });

  const score =
    ratings.reduce((total, next) => total + next.rating, 0) / ratings.length;

  const product = await Product.findByIdAndUpdate(this._conditions.product, {
    score,
  });
});

const Rating = model('Rating', schema);

module.exports = Rating;
