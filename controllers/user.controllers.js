const User = require('../models/user.model');

const postRegister = async (req, res) => {
  try {
    const { user } = req.body;

    const isDuplicated = await User.findOne({
      $or: [{ email: user.email }, { phone: user.phone }],
    });

    if (isDuplicated) {
      throw new Error('Email or phone is already used');
    }

    const newUser = new User(user);

    await newUser.save();

    res.json(newUser);
  } catch (error) {
    res.json(error.message || error);
  }
};

module.exports = {
  postRegister,
};
