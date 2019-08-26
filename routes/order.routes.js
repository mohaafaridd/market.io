const express = require('express');
const userAuthentication = require('../middlewares/userAuthentication');
const controller = require('../controllers/order.controller');

const router = express.Router();

router.post('/', userAuthentication, controller.postOrder);
module.exports = router;
