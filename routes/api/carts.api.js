const express = require('express');

const authentication = require('../../middlewares/authentication');
const authorization = require('../../middlewares/authorization');
const controller = require('../../controllers/api/cart.controller');
const Role = require('../../middlewares/role');

const router = express.Router();

router.post('/', authorization(Role.User), authentication, controller.postCart);
router.patch(
  '/',
  authorization(Role.User),
  authentication,
  controller.patchCart
);
router.post(
  '/delete-item',
  authorization(Role.User),
  authentication,
  controller.deleteCart
);
router.post(
  '/clear',
  authorization(Role.User),
  authentication,
  controller.deleteFullCart
);
module.exports = router;
