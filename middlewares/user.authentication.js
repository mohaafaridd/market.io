const User = require('../models/user.model');

const authentication = async (req, res, next) => {
  const user = await User.findOne({
    _id: req.user.id,
    'tokens.token': req.token,
  });

  if (!user) {
    return res.status(403).json({ message: 'No access' });
  } else {
    req.user = user;
    next();
  }
};

module.exports = authentication;
