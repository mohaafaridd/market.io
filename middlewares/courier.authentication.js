const Courier = require('../models/courier.model');

const authentication = async (req, res, next) => {
  const courier = await Courier.findOne({
    _id: req.courier.id,
    'tokens.token': req.token,
  });

  if (!courier) {
    return res.status(403).json({ message: 'No access' });
  } else {
    req.courier = courier;
    next();
  }
};

module.exports = authentication;
