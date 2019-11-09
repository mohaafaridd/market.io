import React, { Fragment } from 'react';

import AddBundle from './AddBundle';
import AddProduct from './AddProduct';
import Products from './Products';
import Bundles from './Bundles';

const BundlesTab = () => {
  return (
    <section className='bundles-tab'>
      <div className='bundle-control'>
        <AddBundle />
        <AddProduct />
        <Products />
      </div>
      <div className='bundle-statistics'>
        <Bundles />
      </div>
    </section>
  );
};

export default BundlesTab;
