import React, { Fragment, useEffect, useContext } from 'react';
import ProductContext from '../../context/product/productContext';
import AuthContext from '../../context/auth/authContext';
import ProductItem from './ProductItem';
const Products = () => {
  const productContext = useContext(ProductContext);
  const authContext = useContext(AuthContext);

  const { getProducts, products, loading } = productContext;
  const { client } = authContext;

  useEffect(() => {
    getProducts(client);
  }, [client]);

  if (loading) {
    return <h4>Loading...</h4>;
  }

  return (
    <div>
      {products && products.map(product => <ProductItem product={product} />)}
    </div>
  );
};

export default Products;
