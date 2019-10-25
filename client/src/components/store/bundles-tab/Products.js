import React, { useContext } from 'react';
import BundleContext from '../../../context/bundle/bundleContext';

const Products = () => {
  const bundleContext = useContext(BundleContext);
  return (
    <div>
      <h3>Products in bundle</h3>
    </div>
  );
};

export default Products;
