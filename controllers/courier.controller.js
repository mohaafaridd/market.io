const Role = require('../middlewares/role');
const User = require('../models/user.model');

const postResign = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.user._id, role: Role.Courier },
    { role: Role.User },
    { new: Role.User }
  );

  res.json({ message: 'Here', user });
};

module.exports = {
  postResign,
};
