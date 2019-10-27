import React, { useContext } from 'react';
import BundleContext from '../../../context/bundle/bundleContext';

const BundleItem = ({ bundle }) => {
  const { name, products } = bundle;
  const bundleContext = useContext(BundleContext);
  const { setBundle, deleteBundle } = bundleContext;
  return (
    <li>
      <p>{name}</p>
      <p>products: {products.length}</p>
      <button onClick={e => setBundle(bundle)}>Edit</button>
      <button onClick={e => deleteBundle(bundle)}>Delete</button>
    </li>
  );
};

export default BundleItem;
