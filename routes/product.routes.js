const express = require('express');
const storeAuthentication = require('../middlewares/storeAuthentication');
const controller = require('../controllers/product.controller');

const router = express.Router();

router.post('/', storeAuthentication, controller.postProduct);
router.get('/:id', controller.getProduct);
router.patch('/:id', storeAuthentication, controller.patchProduct);
router.delete('/:id', storeAuthentication, controller.deleteProduct);

module.exports = router;
