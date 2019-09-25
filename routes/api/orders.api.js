const express = require('express');
// user auth
// const userAuthorization = require('../../middlewares/user.authorization');
// const userAuthentication = require('../../middlewares/user.authentication');

// courier auth
// const courierAuthorization = require('../../middlewares/courier.authorization');
// const courierAuthentication = require('../../middlewares/courier.authentication');

const authorization = require('../../middlewares/authorization');
const authentication = require('../../middlewares/authentication');

const controller = require('../../controllers/api/order.controller');
const Role = require('../../middlewares/role');

const router = express.Router();

router.post(
  '/',
  authorization(Role.User),
  authentication,
  controller.postOrder
);

router.patch(
  '/:id',
  authorization(Role.Courier),
  authentication,
  controller.updateOrder
);

module.exports = router;
