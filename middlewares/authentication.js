const User = require('../models/user.model');
const Role = require('./role');

const authentication = async (req, res, next) => {
  if (req.client.role === Role.Anonymous) {
    req.anonymous = true;
    return next();
  }

  const client = await await User.findOne({
    _id: req.client.id,
    'tokens.token': req.token,
  });

  if (!client) {
    return res.status(403).json({
      message: 'Access Denied',
    });
  } else {
    req.client = client;
    next();
  }
};

module.exports = authentication;
