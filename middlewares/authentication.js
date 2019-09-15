const Courier = require('../models/courier.model');
const Store = require('../models/store.model');
const User = require('../models/user.model');
const Role = require('./role');

const getClient = async req => {
  const { role } = req.client;

  switch (role) {
    case Role.Courier:
      const courier = await Courier.findOne({
        _id: req.client.id,
        'tokens.token': req.token,
      });
      return courier;

    case Role.Store:
      const store = await Store.findOne({
        _id: req.client.id,
        'tokens.token': req.token,
      });
      return store;

    case Role.Administrator:
    case Role.User:
      const user = await User.findOne({
        _id: req.client.id,
        'tokens.token': req.token,
      });
      return user;

    default:
      break;
  }
};

const authentication = async (req, res, next) => {
  const client = await getClient(req);

  if (!client) {
    return res.status(403).json({
      message: 'Sorry, you do not have authentication to access this page',
    });
  } else {
    req.client = client;
    next();
  }
};

module.exports = authentication;
