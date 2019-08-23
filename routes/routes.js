const express = require('express');
const router = express.Router();

const indexRoutes = require('./index');
const userRoutes = require('./user.routes');

const connectRoutes = () => {
  router.use('/user', userRoutes);
  router.use('/', indexRoutes);
  return router;
};

module.exports = {
  connectRoutes,
};
