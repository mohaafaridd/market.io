import React, { useContext } from 'react';
import BundleContext from '../../../context/bundle/bundleContext';

const BundleItem = ({ bundle }) => {
  const { name, products } = bundle;
  const bundleContext = useContext(BundleContext);
  const { setBundle } = bundleContext;
  return (
    <li>
      <p>{name}</p>
      <p>products: {products.length}</p>
      <button onClick={e => setBundle(bundle)}>Edit</button>
      <button>Delete</button>
    </li>
  );
};

export default BundleItem;
