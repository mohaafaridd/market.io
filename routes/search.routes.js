const express = require('express');
const pages = require('../controllers/pages/search.page');
const controller = require('../controllers/api/search.controller');
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const router = express.Router();

router.get(
  '/',
  authorization(),
  authentication,
  controller.getProducts,
  pages.getSearch
);

module.exports = router;
