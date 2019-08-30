const express = require('express');
const storeAuthentication = require('../middlewares/storeAuthentication');
const userAuthentication = require('../middlewares/userAuthentication');

const router = express.Router();
const controller = require('../controllers/product.controller');

router.post('/', storeAuthentication, controller.postProduct);
router.get('/:id', controller.getProduct);
router.patch('/:id', storeAuthentication, controller.patchProduct);
router.delete('/:id', storeAuthentication, controller.deleteProduct);

module.exports = router;
