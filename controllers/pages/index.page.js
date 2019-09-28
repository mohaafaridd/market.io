const Role = require('../../middlewares/role');

const getMainPage = (req, res) => {
  const { client } = req.cookies;
  const objectifiedClient = client && JSON.parse(client);
  const role = client ? objectifiedClient.role : 'Anonymous';
  const username = role === Role.Store ? objectifiedClient.username : null;
  res.render('index', { title: 'market.io', [role]: true, username });
};

const getRegisterPage = (req, res) => {
  const { client } = req.cookies;
  if (client) {
    return res.redirect('/');
  }
  const role = 'Anonymous';
  res.render('general/register', { title: 'Register', [role]: true });
};

const getLoginPage = (req, res) => {
  const { client } = req.cookies;
  if (client) {
    return res.redirect('/');
  }
  const role = 'Anonymous';
  res.render('general/login', { title: 'Login', [role]: true });
};

module.exports = {
  getMainPage,
  getRegisterPage,
  getLoginPage,
};
