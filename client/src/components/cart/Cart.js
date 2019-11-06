import React, { useContext, useEffect } from 'react';
import uuid from 'uuid';
import CartBundleItem from './CartBundleItem';
import CartProductItem from './CartProductItem';
import CartContext from '../../context/cart/cartContext';
const Carts = () => {
  const { getCarts, carts, clearCart, loading, createOrder } = useContext(
    CartContext
  );
  const [bundles, products, bill] = carts;

  useEffect(() => {
    getCarts();
    // eslint-disable-next-line
  }, []);

  const onClearCart = e => {
    clearCart();
  };

  if (loading) {
    return <h4>Loading</h4>;
  }

  if (bill === 0) {
    return <h4>Your cart is empty</h4>;
  }

  return (
    <div>
      <h3>Carts</h3>
      <button
        onClick={onClearCart}
        disabled={carts.length === 0 || carts[2] === 0}
      >
        Clear Cart
      </button>
      <p>Bill: {bill ? bill : 0}</p>
      <ul>
        {products &&
          products.map(cart => <CartProductItem key={uuid.v4()} cart={cart} />)}
        {bundles &&
          bundles.map(cart => <CartBundleItem key={uuid.v4()} cart={cart} />)}
      </ul>
      <button
        disabled={carts.length === 0 || carts[2] === 0}
        onClick={createOrder}
      >
        Checkout
      </button>
    </div>
  );
};

export default Carts;
