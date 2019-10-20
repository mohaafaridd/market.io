const ms = require('ms');
const User = require('../models/user.model');
const { extractErrors } = require('./helpers/validator');

// @route       POST api/users
// @desc        Register a user
// @access      Public
const postRegister = async (req, res) => {
  try {
    const user = new User(req.body);
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
        client: user,
        token,
      });
  } catch (error) {
    const errors = extractErrors(error.errors);

    res.status(400).json({
      success: false,
      message: 'Registration failed',
      cause: errors,
    });
  }
};

// @route       POST api/users
// @desc        Register a user
// @access      Public
const postLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body);
    const token = await user.generateAuthToken();
    const maxAge = ms(process.env.MAX_AGE);

    res
      .cookie('token', token, { maxAge })
      .cookie('client', JSON.stringify(user), { maxAge })
      .json({
        success: true,
        message: `Welcome back ${user.name}!`,
        client: user,
        token,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Login failed' });
  }
};

// @route       POST api/users
// @desc        Register a user
// @access      Private
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

// @route       GET api/users/me
// @desc        Gets credentials
// @access      Private
const getUser = (req, res) => {
  try {
    res.json({ client: req.client });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  postRegister,
  postLogin,
  postLogout,
  getUser,
};
