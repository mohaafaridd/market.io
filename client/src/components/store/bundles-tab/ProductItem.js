import React from 'react';

const ProductItem = ({ item: { discount, product } }) => {
  return (
    <li>
      <p>{product.name}</p>
      <p>{discount}</p>
    </li>
  );
};

export default ProductItem;
