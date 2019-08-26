const Order = require('../models/order.model');

const {
  getSoldOutProducts,
  setNewProductsLimits,
} = require('./helpers/order.helper');

const postOrder = async (req, res) => {
  try {
    const soldOutProducts = await getSoldOutProducts(req.user.cart);

    // Instead of ordering the full cart,
    // the user can pick which product to be purchased in this order
    const products = req.body.products.filter(
      product =>
        req.user.cart.includes(product._id) &&
        !soldOutProducts.includes(product._id)
    );

    if (products.length === 0) {
      throw new Error('No products are in stock at the moment');
    }

    const order = new Order({
      delivered: false,
      customer: req.user._id,
      products,
    });

    await order.save();
    await setNewProductsLimits(products);

    res.json({ order });
  } catch (error) {
    res.json({ error: { ...error }, message: error.message });
  }
};

module.exports = {
  postOrder,
};
