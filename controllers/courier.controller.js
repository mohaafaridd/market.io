const Role = require('../middlewares/role');
const Courier = require('../models/courier.model');

const postResign = async (req, res) => {
  const courier = await Courier.findOneAndUpdate(
    { _id: req.courier._id, role: Role.Courier },
    { role: Role.Courier },
    { new: true }
  );

  res.json({ courier });
};

module.exports = {
  postResign,
};
