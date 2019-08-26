const express = require('express');
const storeAuthentication = require('../middlewares/storeAuthentication');
const userAuthentication = require('../middlewares/userAuthentication');

const router = express.Router();
const controllers = require('../controllers/product.controllers');

router.post('/', storeAuthentication, controllers.postProduct);
router.post('/cart', userAuthentication, controllers.postToCart);
router.delete('/cart', userAuthentication, controllers.deleteFromCart);
router.get('/:id', controllers.getProduct);
router.patch('/:id', storeAuthentication, controllers.patchProduct);
router.delete('/:id', storeAuthentication, controllers.deleteProduct);

module.exports = router;
