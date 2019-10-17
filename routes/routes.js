const express = require('express');

const router = express.Router();

const cartRoutes = require('./cart.routes');
const indexRoutes = require('./index');
const orderRoutes = require('./order.routes');
const productRoutes = require('./product.routes');
const searchRoutes = require('./search.routes');
const storeRoutes = require('./store.routes');
const bundleRoutes = require('./bundle.routes');
const userRoutes = require('./users.routes');

const connectRoutes = () => {
  router.use('/api/carts', cartRoutes);
  router.use('/api/bundles', bundleRoutes);
  router.use('/api/orders', orderRoutes);
  router.use('/api/products', productRoutes);
  router.use('/api/search', searchRoutes);
  router.use('/api/stores', storeRoutes);
  router.use('/api/users', userRoutes);
  router.use('/', indexRoutes);
  return router;
};

module.exports = {
  connectRoutes,
};
