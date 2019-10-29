import React, { useContext, useEffect } from 'react';
import CartItem from './CartItem';
import CartContext from '../../context/cart/cartContext';
const Carts = () => {
  const { getCarts, carts } = useContext(CartContext);

  useEffect(() => {
    getCarts();
  }, []);

  return (
    <div>
      <h3>Carts</h3>
      <ul>
        {carts && carts.length === 0 ? (
          <li>No products in cart</li>
        ) : (
          carts.map(cart => <CartItem cart={cart} />)
        )}
      </ul>
    </div>
  );
};

export default Carts;
