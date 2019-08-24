const express = require('express');
const authentication = require('../middlewares/storeAuthentication');

const router = express.Router();
const controllers = require('../controllers/product.controllers');

router.post('/', authentication, controllers.postProduct);

router.get('/:id', controllers.getProduct);

module.exports = router;
