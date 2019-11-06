import React, { useContext, useEffect } from 'react';
import ProductItem from './ProductItem';
import BundleContext from '../../../context/bundle/bundleContext';

const Products = () => {
  const bundleContext = useContext(BundleContext);
  const { offers, bundle, getBundle } = bundleContext;
  useEffect(() => {
    if (bundle) {
      getBundle(bundle);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h3>Products in bundle</h3>
      <ul>
        {bundle ? (
          offers.length === 0 ? (
            <li>No offers</li>
          ) : (
            offers.map(item => (
              <ProductItem key={item.product._id} item={item} />
            ))
          )
        ) : (
          <li>Please Select a bundle</li>
        )}
      </ul>
    </div>
  );
};

export default Products;
