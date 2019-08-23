const User = require('../models/user.model');

const postRegister = async (req, res) => {
  const user = new User(req.body.user);

  try {
    await user.save();

    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(400).json(error.message || error);
  }
};

module.exports = {
  postRegister,
};
