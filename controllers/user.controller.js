const ms = require('ms');
const User = require('../models/user.model');

const postRegister = async (req, res) => {
  const user = new User(req.body.user);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    const maxAge = ms(process.env.MAX_AGE);
    res
      .cookie('authentication', token, { maxAge })
      .status(201)
      .json({ user, token });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const postLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.user.email,
      req.body.user.password
    );

    const token = await user.generateAuthToken();
    const maxAge = ms(process.env.MAX_AGE);

    res.cookie('authentication', token, { maxAge }).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );
    await req.user.save();
    res
      .clearCookie('authentication')
      .json({ message: 'user logged out successfully' });
  } catch (error) {
    res.status(200).json({ message: 'user logging out failed' });
  }
};

module.exports = {
  postRegister,
  postLogin,
  postLogout,
};
