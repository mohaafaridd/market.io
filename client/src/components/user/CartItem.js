import React from 'react';

const CartItem = ({ cart }) => {
  const { product, bundle, amount } = cart;

  return (
    <li>
      <p>{product ? product.name : bundle.name}</p>
      <p>Amount: {amount}</p>
    </li>
  );
};

export default CartItem;
