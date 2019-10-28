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
      bundle,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// @route       GET api/bundles/:id
// @desc        Gets a bundle data
// @access      Private
const getBundle = async (req, res) => {
  try {
    const { client: store } = req;
    const { id } = req.params;
    const bundle = await Bundle.findOne({ _id: id, store: store._id }).populate(
      'offers.product'
    );
    if (!bundle) {
      throw new Error('No bundle was found');
    }
    res.status(200).json({
      success: true,
      message: 'You got your bundle details!',
      bundle,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route       GET api/bundles/
// @desc        Gets all store bundles
// @access      Private
const getBundles = async (req, res) => {
  try {
    const { client: store } = req;
    const bundles = await Bundle.find({ store: store._id }).populate(
      'offers.product'
    );

    res.status(200).json({
      success: true,
      message: 'You got your bundles !',
      bundles,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
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
      { $pull: { offers: { product } } }
    );

    const bundle = await Bundle.findOneAndUpdate(
      { _id: id, store: store._id },
      { $push: { offers: { product, discount } } },
      { context: 'query', runValidators: true, new: true }
    ).populate('offers.product');

    res.status(200).json({
      success: true,
      message: 'Added product to bundle!',
      bundle,
    });
  } catch (error) {
    console.log(error);
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
      { $pull: { offers: { product } } },
      { new: true }
    ).populate('offers.product');

    if (!bundle) {
      throw new Error('No bundle was found');
    }

    res.status(200).json({
      success: true,
      message: 'Product was removed from bundle!',
      bundle,
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
      bundle,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  postBundle,
  patchBundle,
  getBundle,
  getBundles,
  putBundle,
  deleteFromBundle,
  deleteBundle,
};
