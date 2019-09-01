const User = require('../models/user.model');

const getStore = async (req, res) => {
  try {
    const store = await User.findOne({ username: req.params.username });

    if (!store) {
      return res.status(404).json({ message: 'no store was found' });
    }

    await store.populate('products').execPopulate();
    res.json({ store, products: store.products });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  getStore,
};
