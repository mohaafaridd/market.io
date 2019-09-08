const Store = require('../models/store.model');
const User = require('../models/user.model');
const Role = require('./role');

const storeOnRole = async ({ role, id }, token) => {
  switch (role) {
    case Role.Administrator:
      const user = await User.findById(id);
      return user;

    case Role.Store:
      const store = await Store.findOne({
        _id: id,
        'tokens.token': token,
      });
      return store;
  }
};

const authentication = async (req, res, next) => {
  const store = await storeOnRole(req.store, req.token);

  if (!store) {
    return res.status(403).json({ message: 'No access' });
  } else {
    req.store = store;
    next();
  }
};

module.exports = authentication;
