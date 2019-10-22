import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const ProductItem = ({ product: { name, price } }) => {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <h3>{name}</h3>
      <p>${price}</p>
    </div>
  );
};

export default ProductItem;
