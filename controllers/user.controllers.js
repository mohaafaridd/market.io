const User = require('../models/user.model');

const postRegister = async (req, res) => {
  const user = new User(req.body.user);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const postLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.user.email,
      req.body.user.password,
    );
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postRegister,
  postLogin,
};
