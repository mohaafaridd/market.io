const Product = require('../../models/product.model');

const inStockCheck = async (product, cart) => {
  const stock = await Product.findById(product.id);
  if (!stock) {
    throw new Error('No product was found');
  }

  const incoming = product.amount;
  const inCart = cart.products.filter(item => item.id === product.id);
  const total = inCart.length === 0 ? incoming : incoming + item + amount;

  return stock.amount - total > -1 ? true : false;
};

module.exports = {
  inStockCheck,
};
