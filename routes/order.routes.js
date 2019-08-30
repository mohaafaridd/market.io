const express = require('express');
const userAuthentication = require('../middlewares/userAuthentication');
const controller = require('../controllers/order.controller');

const router = express.Router();

router.post('/', userAuthentication, controller.postOrder);
router.patch('/:id', userAuthentication, controller.updateOrder);
module.exports = router;
