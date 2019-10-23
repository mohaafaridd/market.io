import React, { Fragment } from 'react';
import AddProduct from './AddProduct';
import ProductsStatistics from './ProductsStatistics';

const ProductsTab = () => {
  return (
    <Fragment>
      <AddProduct />
      <ProductsStatistics />
    </Fragment>
  );
};

export default ProductsTab;
