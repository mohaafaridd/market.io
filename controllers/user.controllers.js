const User = require('../models/user.model');

const postRegister = async (req, res) => {
  const user = new User(req.body.user);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
};

module.exports = {
  postRegister,
};
