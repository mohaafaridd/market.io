import React, { useContext, useEffect } from 'react';
import uuid from 'uuid';
import CartBundleItem from './CartBundleItem';
import CartProductItem from './CartProductItem';
import CartContext from '../../context/cart/cartContext';
const Carts = () => {
  const { getCarts, carts, clearCart } = useContext(CartContext);
  const [bundles, products, bill] = carts;

  useEffect(() => {
    getCarts();
  }, []);

  const onClearCart = e => {
    clearCart();
  };

  return (
    <div>
      <h3>Carts</h3>
      <button onClick={onClearCart} disabled={carts[2] === 0}>
        Clear Cart
      </button>
      <p>Bill: {bill ? bill : 0}</p>
      <ul>
        {products &&
          products.map(cart => <CartProductItem key={uuid.v4()} cart={cart} />)}
        {bundles &&
          bundles.map(cart => <CartBundleItem key={uuid.v4()} cart={cart} />)}
      </ul>
      <button disabled={carts[2] === 0}>Checkout</button>
    </div>
  );
};

export default Carts;
