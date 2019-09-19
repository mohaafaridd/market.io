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
      .cookie('client', JSON.stringify(user), { maxAge })
      .status(201)
      .json({
        success: true,
        message: 'Registered Successfully!',
        user,
        token,
      });
  } catch (error) {
    const extracted = extractErrors(error.errors);
    res.status(400).json({
      success: false,
      message: 'Registration failed',
      cause: extracted,
    });
  }
};

const postLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.user);

    const token = await user.generateAuthToken();
    const maxAge = ms(process.env.MAX_AGE);

    res
      .cookie('token', token, { maxAge })
      .cookie('client', JSON.stringify(user), { maxAge })
      .json({
        success: true,
        message: `Welcome back ${user.name}!`,
        user,
        token,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Login failed' });
  }
};

const postLogout = async (req, res) => {
  try {
    req.client.tokens = req.client.tokens.filter(
      token => token.token !== req.token
    );
    await req.client.save();

    res
      .clearCookie('token')
      .clearCookie('client')
      .json({
        success: true,
        message: `${req.client.name} Logged out Successfully!`,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Logging out failed' });
  }
};

const patchInformation = async (req, res) => {
  try {
    const { updates } = req.body;

    const user = await User.findOneAndUpdate({ _id: req.client.id }, updates, {
      new: true,
      runValidators: true,
      context: 'query',
    });

    res.json({ success: true, message: 'Successfully updated!', user });
  } catch (error) {
    res.json({
      success: false,
      message: 'Update failed',
      error: error.message,
    });
  }
};

module.exports = {
  postRegister,
  postLogin,
  postLogout,
  patchInformation,
};
