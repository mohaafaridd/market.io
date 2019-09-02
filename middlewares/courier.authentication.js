const Courier = require('../models/courier.model');

const authentication = async (req, res, next) => {
  const courier = await Courier.findOne({
    _id: req.courier.id,
    'tokens.token': req.token,
  });

  if (!courier) {
    return res.status(401).json({ message: 'You are not authenticated' });
  } else {
    req.courier = courier;
    next();
  }
};

module.exports = authentication;
