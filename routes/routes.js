const express = require('express');

const router = express.Router();

const indexRoutes = require('./index');
const userRoutes = require('./user.routes');
const storeRoutes = require('./store.routes');
const productRoutes = require('./product.routes');
const orderRoutes = require('./order.routes');
const cartRoutes = require('./cart.routes');
const courierRoutes = require('./courier.routes');

const connectRoutes = () => {
  router.use('/cart', cartRoutes);
  router.use('/couriers', courierRoutes);
  router.use('/orders', orderRoutes);
  router.use('/products', productRoutes);
  router.use('/stores', storeRoutes);
  router.use('/users', userRoutes);
  router.use('/', indexRoutes);
  return router;
};

module.exports = {
  connectRoutes,
};
