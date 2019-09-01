const express = require('express');
const controller = require('../controllers/store.controller');
const Role = require('../middlewares/role');

const router = express.Router();

router.get('/:username', controller.getStore);

module.exports = router;
