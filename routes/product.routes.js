const express = require('express');
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const Role = require('../middlewares/role');

const api = require('./api/products.api');

const router = express.Router();
router.use('/api', api);
router.get('/add', authorization(Role.Store), authentication, (req, res) => {
  try {
    const { client: store } = req;
    res.render('products/add-product', { title: 'Add Product', store });
  } catch (error) {
    res.redirect('/');
  }
});

router.get('/:id', authorization(), authentication, (req, res) => {
  const { client, token } = req;
  res.json({ token, client });
});

module.exports = router;
