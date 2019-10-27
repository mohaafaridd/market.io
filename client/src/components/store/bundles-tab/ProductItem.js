import React, { useContext } from 'react';
import BundleContext from '../../../context/bundle/bundleContext';

const ProductItem = ({ item: { discount, product } }) => {
  const { setProduct } = useContext(BundleContext);

  return (
    <li>
      <p>{product.name}</p>
      <p>price: ${product.price}</p>
      <p>discount: {discount}%</p>
      <p>price after discount: ${product.price * (1 - discount / 100)}</p>
      <button onClick={e => setProduct(product)}>Edit</button>
    </li>
  );
};

export default ProductItem;
