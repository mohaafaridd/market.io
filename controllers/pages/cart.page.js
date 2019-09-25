const myCart = async (req, res) => {
  const { cart, client } = req;
  const { role } = client;

  res.render('user/cart', { title: 'Shopping Cart', [role]: true, cart });
};

module.exports = {
  myCart,
};
