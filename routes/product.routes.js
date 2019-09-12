const express = require('express');
const authorization = require('../middlewares/store.authorization');
const authentication = require('../middlewares/store.authentication');
const Role = require('../middlewares/role');

const api = require('./api/products.api');

const router = express.Router();
router.use('/api', api);
router.get('/add', authorization(Role.Store), authentication, (req, res) => {
  const { store } = req;
  res.render('products/add-product', { title: 'Add Product', store });
});

module.exports = router;
