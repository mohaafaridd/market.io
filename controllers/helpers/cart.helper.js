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

const modifyCart = (product, cart) => {
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

module.exports = {
  inStockCheck,
  modifyCart,
};
