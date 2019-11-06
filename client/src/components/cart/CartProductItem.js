import React, { useContext } from 'react';
import CartContext from '../../context/cart/cartContext';

const CartItem = ({ cart }) => {
  const { product, store, bill, amount } = cart;
  const { editCart, deleteCart } = useContext(CartContext);

  const updateAmount = e => {
    e.preventDefault();
    editCart(cart, e.target.value);
  };

  const deleteProductCart = e => {
    e.preventDefault();
    deleteCart(cart);
  };

  return (
    <li>
      <p>{product.name}</p>
      <p>rate: {product.score ? product.score : 'Not Rated'}</p>
      <p>Unit Price: {product.price}</p>
      <p>Total Price: {bill}</p>
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

      <button onClick={deleteProductCart}>Delete</button>
    </li>
  );
};

export default CartItem;
