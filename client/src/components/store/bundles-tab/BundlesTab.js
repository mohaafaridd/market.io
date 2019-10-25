import React, { Fragment } from 'react';

import AddBundle from './AddBundle';
import AddProduct from './AddProduct';
import Products from './Products';
import Bundles from './Bundles';

const BundlesTab = () => {
  return (
    <Fragment>
      <h1>Bundles</h1>
      <AddBundle />
      <AddProduct />
      <Products />
      <Bundles />
    </Fragment>
  );
};

export default BundlesTab;
