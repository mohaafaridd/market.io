import React, { Fragment } from 'react';

import AddBundle from './AddBundle';
import AddProduct from './AddProduct';
import Products from './Products';

const BundlesTab = () => {
  return (
    <Fragment>
      <h1>Bundles</h1>
      <AddBundle />
      <AddProduct />
      <Products />
    </Fragment>
  );
};

export default BundlesTab;
