const Role = require('../../middlewares/role');

const getSearch = (req, res) => {
  const { products, count, client } = req;
  const { role, username } = client;

  res.render('general/search', {
    title: `(${count}) Search Results`,
    [role]: true,
    user: role === Role.User,
    success: true,
    message: 'Search completed',
    products,
    count,
  });
};

module.exports = {
  getSearch,
};
