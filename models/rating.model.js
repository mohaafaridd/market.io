const Product = require('./product.model');
const Store = require('./store.model');

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

const changeScore = async (model, id) => {
  const ratings = await Rating.find({
    [model]: id,
  });

  const score =
    ratings.reduce((total, next) => total + next.score, 0) / ratings.length;

  switch (model) {
    case 'product':
      const product = await Product.findByIdAndUpdate(
        id,
        { score },
        { new: true, upsert: true }
      );
      return product;

    case 'store':
      const store = await Store.findByIdAndUpdate(
        id,
        { score },
        { new: true, upsert: true }
      );
      return store;

    default:
      break;
  }
};

schema.post('findOneAndUpdate', async function() {
  const product = await changeScore('product', this._conditions.product);
  const store = await changeScore('store', this._conditions.store);
});

const Rating = model('Rating', schema);

module.exports = Rating;
