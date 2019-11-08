import React from 'react';
import AddProduct from './AddProduct';
import ProductsStatistics from './ProductsStatistics';

const ProductsTab = () => {
  return (
    <section className='products-tab'>
      <AddProduct />
      <ProductsStatistics />
    </section>
  );
};

export default ProductsTab;
