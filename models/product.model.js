const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const schema = new Schema(
  {
    category: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 36,
    },

    manufacturer: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 36,
    },

    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 36,
    },

    description: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 300,
    },

    model: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 36,
    },

    color: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 36,
    },

    store: {
      type: ObjectId,
      required: true,
      ref: 'Store',
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      // Free gifts
      max: 100,
    },

    booked: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    picture: {
      type: Buffer,
    },

    score: {
      type: Number,
      default: null,
      min: 0,
      max: 5,
    },

    voters: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

schema.index({ name: 'text' });

// Getting store products if role is store
schema.virtual('ratings', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'product',
});

const Product = model('Product', schema);

module.exports = Product;
