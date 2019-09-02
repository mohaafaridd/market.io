const express = require('express');
// user auth
const userAuthorization = require('../middlewares/user.authorization');
const userAuthentication = require('../middlewares/user.authentication');

// courier auth
const courierAuthorization = require('../middlewares/courier.authorization');
const courierAuthentication = require('../middlewares/courier.authentication');

const controller = require('../controllers/order.controller');
const Role = require('../middlewares/role');

const router = express.Router();

router.post(
  '/',
  userAuthorization(Role.User),
  userAuthentication,
  controller.postOrder
);

router.patch(
  '/:id',
  courierAuthorization(Role.Courier),
  courierAuthentication,
  controller.updateOrder
);

module.exports = router;
