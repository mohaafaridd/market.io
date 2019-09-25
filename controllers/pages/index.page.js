const getMainPage = (req, res) => {
  const { client } = req.cookies;
  const objectifiedClient = client && JSON.parse(client);
  const role = client ? objectifiedClient.role : 'Anonymous';
  res.render('index', { title: 'market.io', [role]: true });
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
