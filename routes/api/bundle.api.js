const express = require('express');
const authorization = require('../../middlewares/authorization');
const authentication = require('../../middlewares/authentication');
const controller = require('../../controllers/api/bundle.controller');
const Role = require('../../middlewares/role');
const router = express.Router();

router.post(
  '/',
  authorization(Role.Store),
  authentication,
  controller.postBundle
);

router.patch(
  '/:id',
  authorization(Role.Store),
  authentication,
  controller.patchBundle
);

module.exports = router;
