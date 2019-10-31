import React, { useContext, useEffect } from 'react';
import CartProductItem from './CartProductItem';
import CartContext from '../../context/cart/cartContext';
const Carts = () => {
  const { getCarts, carts } = useContext(CartContext);
  const [bundles, products, bill] = carts;

  useEffect(() => {
    getCarts();
  }, []);

  return (
    <div>
      <h3>Carts</h3>
      <p>Bill: {bill ? bill : 0}</p>
      <ul>
        {products && products.map(cart => <CartProductItem cart={cart} />)}
      </ul>
    </div>
  );
};

export default Carts;
