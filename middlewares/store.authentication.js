const Store = require('../models/store.model');

const authentication = async (req, res, next) => {
  const store = await Store.findOne({
    _id: req.store.id,
    'tokens.token': req.token,
  });

  if (!store) {
    return res.status(403).json({ message: 'No access' });
  } else {
    req.store = store;
    next();
  }
};

module.exports = authentication;
