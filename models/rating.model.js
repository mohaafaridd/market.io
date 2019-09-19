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

  score: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },

  comment: {
    type: String,
    maxlength: 300,
  },
});

const changeProductScore = async id => {
  const ratings = await Rating.find({
    product: id,
  });

  const score =
    ratings.reduce((total, next) => total + next.score, 0) / ratings.length;

  const product = await Product.findByIdAndUpdate(id, { score });
};

schema.post('findOneAndUpdate', async function() {
  // console.log(typeof this._conditions.product.toString());
  await changeProductScore(this._conditions.product);
});

const Rating = model('Rating', schema);

module.exports = Rating;
