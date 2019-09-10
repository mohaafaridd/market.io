const express = require('express');
const authorization = require('../../middlewares/store.authorization');
const authentication = require('../../middlewares/store.authentication');
const userAuthorization = require('../../middlewares/user.authorization');
const userAuthentication = require('../../middlewares/user.authentication');
const controller = require('../../controllers/product.controller');
const Role = require('../../middlewares/role');
const { upload } = require('../../middlewares/imageUpload');

const router = express.Router();

router.post(
  '/',
  authorization(Role.Store),
  authentication,
  controller.postProduct
);

router.patch(
  '/:id/picture',
  authorization(Role.Store),
  authentication,
  upload.single('picture'),
  controller.postProductPicture
);

router.get('/:id', controller.getProduct);

router.patch(
  '/rate',
  userAuthorization(Role.User),
  userAuthentication,
  controller.patchRate
);

router.patch(
  '/:id',
  authorization([Role.Store, Role.Administrator]),
  authentication,
  controller.patchProduct
);

router.delete(
  '/:id',
  authorization([Role.Store, Role.Administrator]),
  authentication,
  controller.deleteProduct
);

module.exports = router;
