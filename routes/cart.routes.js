const express = require('express');
const authorization = require('../middlewares/user.authorization');
const controller = require('../controllers/cart.controller');
const Role = require('../middlewares/role');

const router = express.Router();

router.post('/', authorization(Role.User), controller.postCart);
router.delete('/', authorization(Role.User), controller.deleteCart);
module.exports = router;
