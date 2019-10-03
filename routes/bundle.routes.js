const express = require('express');
const api = require('./api/bundle.api');
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const Bundle = require('../models/bundle.model');

const router = express.Router();
router.use('/api', api);
router.get('/:id', authorization(), authentication, async (req, res) => {
  try {
    const { client } = req;
    const { role } = client;
    const { id } = req.params;
    const bundle = await Bundle.findById(id);
    if (!bundle) {
      throw new Error('No bundle was found');
    }
    res.render('bundle/bundle', { title: bundle.name, [role]: true, bundle });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;
