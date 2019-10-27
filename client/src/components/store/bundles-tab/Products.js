import React, { useContext, useEffect } from 'react';
import ProductItem from './ProductItem';
import BundleContext from '../../../context/bundle/bundleContext';

const Products = () => {
  const bundleContext = useContext(BundleContext);
  const { products, bundle, getBundle } = bundleContext;
  useEffect(() => {
    if (bundle) {
      getBundle(bundle);
    }
  }, [bundle]);

  return (
    <div>
      <h3>Products in bundle</h3>
      <ul>
        {bundle ? (
          products.map(item => (
            <ProductItem key={item.product._id} item={item} />
          ))
        ) : (
          <li>Please Select a bundle</li>
        )}
      </ul>
    </div>
  );
};

export default Products;