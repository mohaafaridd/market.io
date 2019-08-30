const express = require('express');
const storeAuthentication = require('../middlewares/storeAuthentication');
const authorization = require('../middlewares/store.authorization');
const controller = require('../controllers/product.controller');
const Role = require('../middlewares/role');

const router = express.Router();

router.post('/', authorization(Role.Store), controller.postProduct);
router.get('/:id', controller.getProduct);
router.patch('/:id', authorization(Role.Store), controller.patchProduct);
router.delete('/:id', authorization(Role.Store), controller.deleteProduct);

module.exports = router;
