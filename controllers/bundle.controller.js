const Bundle = require('../models/bundle.model');

// @route       POST api/bundles
// @desc        Create a bundle
// @access      Private
const postBundle = async (req, res) => {
  try {
    const { client: store } = req;
    const { name } = req.body;
    const bundle = new Bundle({ name, store: store.id });
    await bundle.save();
    res.status(201).json({
      success: true,
      message: 'You added a bundle',
      bundle,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route       PATCH api/bundles/:id
// @desc        Updates a bundle information
// @access      Private
const patchBundle = async (req, res) => {
  try {
    const { client: store } = req;
    const { name } = req.body;
    const { id } = req.params;

    const bundle = await Bundle.findOneAndUpdate(
      { _id: id, store: store._id },
      { name },
      { context: 'query', runValidators: true, new: true }
    );

    if (!bundle) {
      throw new Error('Could not find bundle');
    }

    res.status(200).json({
      success: true,
      message: 'Your new bundle has been updated!',
      payload: bundle,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// @route       PUT api/bundles/:id
// @desc        Adds product to bundle
// @access      Private
const putBundle = async (req, res) => {
  try {
    const { client: store } = req;
    const { id } = req.params;
    const { product, discount } = req.body;

    await Bundle.findOneAndUpdate(
      { _id: id, store: store._id },
      { $pull: { products: { product } } }
    );

    const bundle = await Bundle.findOneAndUpdate(
      { _id: id, store: store._id },
      { $push: { products: { product, discount } } },
      { context: 'query', runValidators: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Added product to bundle!',
      payload: bundle,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// @route       PATCH api/bundles/p/:id
// @desc        Deletes bundle
// @access      Private
const deleteFromBundle = async (req, res) => {
  try {
    const { client: store } = req;
    const { id } = req.params;
    const { product } = req.body;

    const bundle = await Bundle.findOneAndUpdate(
      { _id: id, store: store._id },
      { $pull: { products: { product } } },
      { new: true }
    );

    if (!bundle) {
      throw new Error('No bundle was found');
    }

    res.status(200).json({
      success: true,
      message: 'Product was removed from bundle!',
      payload: bundle,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// @route       DELETE api/bundles/:id
// @desc        Deletes bundle
// @access      Private
const deleteBundle = async (req, res) => {
  try {
    const { client: store } = req;
    const { id } = req.params;

    const bundle = await Bundle.findOneAndDelete({ _id: id, store: store.id });

    if (!bundle) {
      throw new Error('No bundle was found');
    }

    res.status(200).json({
      success: true,
      message: 'Bundle is deleted!',
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  postBundle,
  patchBundle,
  putBundle,
  deleteFromBundle,
  deleteBundle,
};
