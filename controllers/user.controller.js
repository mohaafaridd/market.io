const ms = require('ms');
const User = require('../models/user.model');
const { extractErrors } = require('./helpers/validator.helper');
const postRegister = async (req, res) => {
  try {
    const user = new User(req.body.user);
    await user.save();
    const token = await user.generateAuthToken();
    const maxAge = ms(process.env.MAX_AGE);
    res
      .cookie('token', token, { maxAge })
      .cookie('user', user, { maxAge })
      .status(201)
      .json({ user, token });
  } catch (error) {
    const extracted = extractErrors(error.errors);
    res.status(400).json({ success: false, error: extracted });
  }
};

const postLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.user);

    const token = await user.generateAuthToken();
    const maxAge = ms(process.env.MAX_AGE);

    res
      .cookie('token', token, { maxAge })
      .cookie('user', user, { maxAge })
      .json({ user, token });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const postLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );
    await req.user.save();

    res
      .clearCookie('token')
      .clearCookie('user')
      .json({ message: 'user logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: 'user logging out failed' });
  }
};

const patchInformation = async (req, res) => {
  try {
    const { updates } = req.body;

    const user = await User.findOneAndUpdate({ _id: req.user.id }, updates, {
      new: true,
      runValidators: true,
      context: 'query',
    });

    res.json({ message: 'success', user });
  } catch (error) {
    res.json({ message: 'failed', error: error.message });
  }
};

module.exports = {
  postRegister,
  postLogin,
  postLogout,
  patchInformation,
};
