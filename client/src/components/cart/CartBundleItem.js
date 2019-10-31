import React from 'react';

const CartItem = ({ cart }) => {
  const { products, name, amount, bill, saved, store } = cart;

  return (
    <li>
      <p>{name}</p>
      <p>Amount: {amount}</p>
      <ul>
        {products.map(product => (
          <li>
            <p>{product.name}</p>
            <p>rate: {product.score ? product.score : 'Not Rated'}</p>
            <p>Discount: {product.discount}%</p>
            <p>Unit Price: {product.price}</p>
            <p>After: {product.price * ((100 - product.discount) / 100)}</p>
          </li>
        ))}
      </ul>
      <p>Total Price: {bill}</p>
      <p>Saved: {saved}</p>
      <p>Store: {store.name}</p>
    </li>
  );
};

export default CartItem;
