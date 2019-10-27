import React from 'react';

const ProductItem = ({ item: { discount, product } }) => {
  return (
    <li>
      <p>{product.name}</p>
      <p>price: ${product.price}</p>
      <p>discount: {discount}%</p>
      <p>price after discount: ${product.price * (1 - discount / 100)}</p>
    </li>
  );
};

export default ProductItem;
