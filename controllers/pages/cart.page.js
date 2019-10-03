const getCart = async (req, res) => {
  const { cart, bill, client } = req;
  const { role } = client;

  res.render('user/cart', { title: 'Shopping Cart', [role]: true, cart, bill });
};

module.exports = {
  getCart,
};
