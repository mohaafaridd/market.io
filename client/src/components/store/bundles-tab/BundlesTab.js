import React, { Fragment } from 'react';

import AddBundle from './AddBundle';
import AddProduct from './AddProduct';

const BundlesTab = () => {
  return (
    <Fragment>
      <h1>Bundles</h1>
      <AddBundle />
      <AddProduct />
    </Fragment>
  );
};

export default BundlesTab;
