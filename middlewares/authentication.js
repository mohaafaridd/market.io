const User = require('../models/user.model');
const Role = require('./role');

const getClient = async req => {
  const user = await User.findOne({
    _id: req.client.id,
    'tokens.token': req.token,
  });
  return user;
};

const authentication = async (req, res, next) => {
  if (req.client.role === Role.Anonymous) {
    req.anonymous = true;
    return next();
  }

  const client = await getClient(req);

  if (!client) {
    return res.status(403).json({
      message: `Sorry, you do not have authentication to access this page ${req
        .client.role === Role.Anonymous && 'You are not logged in'}`,
    });
  } else {
    req.client = client;
    next();
  }
};

module.exports = authentication;
