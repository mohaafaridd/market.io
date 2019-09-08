const ms = require('ms');
const Role = require('../middlewares/role');
const Courier = require('../models/courier.model');

const postRegister = async (req, res) => {
  try {
    const courier = new Courier({ ...req.body.courier, role: Role.Courier });
    await courier.save();
    const token = await courier.generateAuthToken();
    const maxAge = ms(process.env.MAX_AGE);
    res
      .cookie('authentication', token, { maxAge })
      .status(201)
      .json({ courier, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postLogin = async (req, res) => {
  try {
    const courier = await Courier.findByCredentials(req.body.courier);

    const token = await courier.generateAuthToken();
    const maxAge = ms(process.env.MAX_AGE);

    res.cookie('authentication', token, { maxAge }).json({ courier, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postLogout = async (req, res) => {
  try {
    req.courier.tokens = req.courier.tokens.filter(
      token => token.token !== req.token
    );
    await req.courier.save();

    res
      .clearCookie('authentication')
      .json({ message: 'courier logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: 'courier logging out failed' });
  }
};

module.exports = {
  postRegister,
  postLogin,
  postLogout,
};
