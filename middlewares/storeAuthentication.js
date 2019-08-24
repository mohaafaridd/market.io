const jwt = require('jsonwebtoken');
const Store = require('../models/store.model');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    console.log(decoded._id);
    console.log(token);

    const store = await Store.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!store) {
      throw new Error('You are not authenticated');
    }

    req.token = token;
    req.store = store;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = auth;
