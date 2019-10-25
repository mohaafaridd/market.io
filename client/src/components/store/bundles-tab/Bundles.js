import React, { useEffect, useContext } from 'react';
import BundleContext from '../../../context/bundle/bundleContext';

const Bundles = () => {
  const bundleContext = useContext(BundleContext);
  const { bundles, getBundles } = bundleContext;
  useEffect(() => {
    getBundles();
  }, []);

  return (
    <div>
      <h3>All your bundles</h3>
      <h3>{bundles && bundles.length}</h3>
    </div>
  );
};

export default Bundles;
