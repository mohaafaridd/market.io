const express = require('express');

const router = express.Router();

const indexRoutes = require('./index');
const userRoutes = require('./user.routes');
const storeRoutes = require('./store.routes');
const productRoutes = require('./product.routes');
const orderRoutes = require('./order.routes');

const connectRoutes = () => {
  router.use('/user', userRoutes);
  router.use('/store', storeRoutes);
  router.use('/product', productRoutes);
  router.use('/order', orderRoutes);
  router.use('/', indexRoutes);
  return router;
};

module.exports = {
  connectRoutes,
};
