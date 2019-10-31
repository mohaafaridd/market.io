import React from 'react';

const CartItem = ({ cart }) => {
  const { product, store, amount, bill } = cart;

  return (
    <li>
      <p>{product.name}</p>
      <p>Amount: {amount}</p>
      <p>rate: {product.score ? product.score : 'Not Rated'}</p>
      <p>Unit Price: {product.price}</p>
      <p>Total Price: {bill}</p>
      <p>Store: {store.name}</p>
    </li>
  );
};

export default CartItem;
