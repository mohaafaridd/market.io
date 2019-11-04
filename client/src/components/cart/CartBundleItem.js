import React, { useContext } from 'react';
import uuid from 'uuid';
import CartContext from '../../context/cart/cartContext';

const CartItem = ({ cart }) => {
  const { products, name, bill, saved, store, amount } = cart;
  const { editCart, deleteCart } = useContext(CartContext);

  const updateAmount = e => {
    e.preventDefault();
    editCart(cart, e.target.value);
  };

  const deleteBundleCart = e => {
    e.preventDefault();
    deleteCart(cart);
  };

  return (
    <li>
      <p>{name}</p>
      <ul>
        {products.map(product => (
          <li key={uuid.v4()}>
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

      <label htmlFor='amount'>Amount </label>
      <select
        name='amount'
        id='amount'
        defaultValue={amount}
        onChange={updateAmount}
      >
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
      </select>

      <button onClick={deleteBundleCart}>Delete</button>
    </li>
  );
};

export default CartItem;
