const express = require('express');
const userAuthentication = require('../middlewares/userAuthentication');
const controller = require('../controllers/cart.controller');

const router = express.Router();

router.post('/', userAuthentication, controller.postCart);
module.exports = router;
