import React, { useContext } from 'react';
import BundleContext from '../../../context/bundle/bundleContext';

const BundleItem = ({ bundle }) => {
  const { name, offers } = bundle;
  const bundleContext = useContext(BundleContext);
  const { setBundle, deleteBundle } = bundleContext;
  return (
    <li>
      <p>{name}</p>
      <p>Offers: {offers.length}</p>
      <button onClick={e => setBundle(bundle)}>Edit</button>
      <button onClick={e => deleteBundle(bundle)}>Delete</button>
    </li>
  );
};

export default BundleItem;
