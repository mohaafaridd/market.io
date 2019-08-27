const Product = require('../../models/product.model');

const inStockCheck = async (product, cart) => {
  // current stock
  const stock = await Product.findById(product.id);
  if (!stock) {
    throw new Error('No product was found');
  }

  //   amount wanted
  const incoming = product.amount;

  const index = cart.products.findIndex(item => {
    return item.id.toHexString() === product.id;
  });

  const total =
    index === -1 ? incoming : cart.products[index].amount + incoming;
  return stock.amount - total > -1 ? true : false;
};

const addToCart = (product, cart) => {
  const index = cart.products.findIndex(item => {
    return item.id.toHexString() === product.id;
  });

  //   product not found? no problem let's add it!
  if (index === -1) {
    cart.products = cart.products.concat({
      id: product.id,
      amount: product.amount,
    });
  } else {
    cart.products[index].amount += product.amount;
  }
};

const getMatchedProducts = (products, cart) => {
  return products.filter(item =>
    cart.products.find(cartItem => item === cartItem.id.toHexString())
  );
};

const removeFromCart = (matches, cart) => {
  return cart.products.filter(product => {
    const isMatch = matches.includes(product.id);
    return isMatch;
  });
};

module.exports = {
  inStockCheck,
  addToCart,
  getMatchedProducts,
  removeFromCart,
};
