import React, { Fragment } from 'react';

const BundleItem = ({ bundle: { name, products } }) => {
  return (
    <li>
      <p>{name}</p>
      <p>products: {products.length}</p>
      <button>Edit</button>
      <button>Delete</button>
    </li>
  );
};

export default BundleItem;
