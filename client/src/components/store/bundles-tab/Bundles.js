import React, { useEffect, useContext } from 'react';
import BundleContext from '../../../context/bundle/bundleContext';
import BundleItem from './BundleItem';
const Bundles = () => {
  const bundleContext = useContext(BundleContext);
  const { bundles, getBundles } = bundleContext;
  useEffect(() => {
    getBundles();
  }, []);

  if (!bundles) {
    return <h3>You have no bundles</h3>;
  }

  return (
    <div>
      <h3>All your bundles</h3>
      <h3>Count: {bundles.length}</h3>
      <ul>
        {bundles.map(bundle => (
          <BundleItem key={bundle._id} bundle={bundle} />
        ))}
      </ul>
    </div>
  );
};

export default Bundles;
