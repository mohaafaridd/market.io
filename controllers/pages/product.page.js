const addProduct = (req, res) => {
  try {
    const { client: store } = req;
    const { role } = store;
    const mode = { type: 'add', button: 'Add Product' };
    res.render('products/add-edit-product', {
      [role]: true,
      mode,
      store,
      title: 'Add Product',
    });
  } catch (error) {
    res.redirect('/');
  }
};

const getProduct = (req, res) => {
  const { client, token, product } = req;
  const { role } = client;
  // [role] = true : sends the actual role in shape of variable
  // so that the template engine can specify the role
  res.render('products/product-page', {
    title: product.name,
    [role]: true,
    product,
  });
};

module.exports = {
  addProduct,
  getProduct,
};