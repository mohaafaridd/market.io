const Product = require('../../models/product.model');
const Cart = require('../../models/cart.model');

const inStockCheck = async (product, user) => {
  // current stock
  const stock = await Product.findById(product.id);
  if (!stock) {
    throw new Error('No product was found');
  }

  //   amount wanted
  const incoming = product.amount;
  const inCart = await Cart.findOne({ owner: user._id, id: product.id });
  const inCartAmount = inCart ? inCart.amount : 0;

  const total = inCartAmount + incoming;
  return stock.amount - total > -1 ? true : false;
};

const increaseBooking = async ({ id }) => {
  await Product.findByIdAndUpdate(id, { $inc: { booked: 1 } });
};

const decreaseBooking = async products => {
  const requests = products.map(id =>
    Product.findByIdAndUpdate(
      id,
      { $inc: { booked: -1 } },
      { runValidators: true },
      (err, product) => {
        if (product.booked < 0) {
          product.booked = 0;
          product.save();
        }
      }
    )
  );
  const responses = await Promise.all(requests);
};

module.exports = {
  inStockCheck,
  increaseBooking,
  decreaseBooking,
};
