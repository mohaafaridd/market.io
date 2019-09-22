const { DECREASE, INCREASE } = require('../constants/cart.flags');
const Product = require('../../models/product.model');
const Cart = require('../../models/cart.model');

const inStockCheck = async (product, amount, user) => {
  // current stock
  const stock = await Product.findById(product);
  if (!stock) {
    throw new Error('We could find this product in our stock');
  }

  //   amount wanted
  const inCart = await Cart.findOne({ user: user._id, product });
  const inCartAmount = inCart ? inCart.amount : 0;

  const total = inCartAmount + amount;
  return stock.amount - total > -1 ? true : false;
};

const patchBooking = async (product, amount = 1, mode = INCREASE) => {
  await Product.findByIdAndUpdate(product, { $inc: { booked: amount * mode } });
};

module.exports = {
  inStockCheck,
  patchBooking,
};
