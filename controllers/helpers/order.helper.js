const User = require('../../models/user.model');
const Product = require('../../models/product.model');

const getSoldOutProducts = async cart => {
  const requests = cart.map(product => Product.findById(product));
  const responses = await Promise.all(requests);
  const soldOut = responses
    .filter(product => product.amount === 0)
    .map(product => product._id.toHexString());
  return soldOut;
};

const setNewProductsLimits = async products => {
  const requests = products.map(product =>
    Product.findByIdAndUpdate(product, { $inc: { amount: -1 } })
  );
  await Promise.all(requests);
};

module.exports = {
  getSoldOutProducts,
  setNewProductsLimits,
};
