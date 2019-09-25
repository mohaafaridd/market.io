const express = require('express');
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');

const controller = require('../controllers/api/product.controller');

const Role = require('../middlewares/role');

const api = require('./api/products.api');

const router = express.Router();
router.use('/api', api);
router.get('/add', authorization(Role.Store), authentication, (req, res) => {
  try {
    const { client: store } = req;
    const { role } = store;
    res.render('products/add-product', {
      title: 'Add Product',
      [role]: true,
      store,
    });
  } catch (error) {
    res.redirect('/');
  }
});

router.get(
  '/:id',
  authorization(),
  authentication,
  controller.getProduct,
  (req, res) => {
    const { client, token, product } = req;
    const { role } = client;
    // [role] = true : sends the actual role in shape of variable
    // so that the template engine can specify the role
    res.render('products/product-page', {
      title: product.name,
      [role]: true,
      product,
    });
  }
);

module.exports = router;
