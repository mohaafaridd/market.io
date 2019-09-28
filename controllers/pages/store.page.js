const Store = require('../../models/store.model');
const getStore = async (req, res) => {
  try {
    const store = await Store.findOne({
      username: req.params.username,
    }).populate('products');

    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: 'No store was found' });
    }

    res.render('store/profile', { store });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  getStore,
};
