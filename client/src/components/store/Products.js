import React, { Fragment, useEffect, useContext } from 'react';
import ProductContext from '../../context/product/productContext';
import AuthContext from '../../context/auth/authContext';
import ProductItem from './ProductItem';
const Products = () => {
  const productContext = useContext(ProductContext);
  const authContext = useContext(AuthContext);

  const { getProducts, products } = productContext;
  const { client } = authContext;

  useEffect(() => {
    getProducts(client);
  }, [client]);

  return (
    <div>
      {products && products.map(product => <ProductItem product={product} />)}
    </div>
  );
};

export default Products;
