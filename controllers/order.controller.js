const Order = require('../models/order.model');

const postOrder = async (req, res) => {
  try {
  } catch (error) {
    res.json({ error: { ...error }, message: error.message });
  }
};

module.exports = {
  postOrder,
};
