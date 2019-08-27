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
  console.log(inCart);
  const inCartAmount = inCart ? inCart.amount : 0;

  const total = inCartAmount + incoming;
  return stock.amount - total > -1 ? true : false;
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
  getMatchedProducts,
  removeFromCart,
};
