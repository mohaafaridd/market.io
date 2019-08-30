const express = require('express');
const authorization = require('../middlewares/user.authorization');
const controller = require('../controllers/order.controller');
const Role = require('../middlewares/role');

const router = express.Router();

router.post('/', authorization(Role.User), controller.postOrder);
router.patch('/:id', authorization(Role.Delivery), controller.updateOrder);
module.exports = router;
