const express = require('express');

const router = express.Router();

const cartRoutes = require('./cart.routes');
const courierRoutes = require('./courier.routes');
const indexRoutes = require('./index');
const orderRoutes = require('./order.routes');
const productRoutes = require('./product.routes');
const searchRoutes = require('./search.routes');
const storeRoutes = require('./store.routes');
const bundleRoutes = require('./bundle.routes');
const userRoutes = require('./user.routes');

const connectRoutes = () => {
  router.use('/carts', cartRoutes);
  router.use('/bundles', bundleRoutes);
  router.use('/couriers', courierRoutes);
  router.use('/orders', orderRoutes);
  router.use('/products', productRoutes);
  router.use('/search', searchRoutes);
  router.use('/stores', storeRoutes);
  router.use('/users', userRoutes);
  router.use('/', indexRoutes);
  return router;
};

module.exports = {
  connectRoutes,
};
