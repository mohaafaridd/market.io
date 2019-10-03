const Bundle = require('../../models/bundle.model');

const postBundle = async (req, res) => {
  try {
    const { client: store } = req;
    const { role } = store;
    const { name, discount } = req.body;

    const bundle = new Bundle({
      name,
      discount,
      store: store.id,
    });

    await bundle.save();
    res
      .status(201)
      .json({ success: true, message: 'Your new bundle is ready!', bundle });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const patchBundle = async (req, res) => {
  try {
    const { client: store } = req;
    const { name, discount } = req.body;
    const { id } = req.params;

    const bundle = await Bundle.findOneAndUpdate(
      { _id: id, store: store.id },
      { name, discount: parseInt(discount) },
      { context: 'query', runValidators: true, new: true }
    );

    if (!bundle) {
      throw new Error('Error editing information');
    }

    res.status(200).json({
      success: true,
      message: 'Your new bundle has been updated!',
      bundle,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const putBundle = async (req, res) => {
  try {
    const { client: store } = req;
    const { id } = req.params;
    const { product } = req.body;

    const bundle = await Bundle.findOneAndUpdate(
      { _id: id, store: store.id },
      { $addToSet: { products: product } },
      { context: 'query', runValidators: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Added product to bundle!',
      bundle,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const deleteBundle = async (req, res) => {
  try {
    const { client: store } = req;
    const { id } = req.params;

    const bundle = await Bundle.findOneAndDelete({ _id: id, store: store.id });

    res.status(200).json({
      success: true,
      message: 'Bundle is deleted!',
      bundle,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  postBundle,
  patchBundle,
  putBundle,
  deleteBundle,
};
