import React, { Fragment, useEffect, useContext } from 'react';
import ProductContext from '../../context/product/productContext';
import AuthContext from '../../context/auth/authContext';

const Products = () => {
  const productContext = useContext(ProductContext);
  const authContext = useContext(AuthContext);

  const { getProducts, products } = productContext;
  const { client } = authContext;

  useEffect(() => {
    getProducts(client);
  }, [client]);

  return <div>Your Products</div>;
};

export default Products;
