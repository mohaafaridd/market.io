import React, { useContext, useEffect } from "react";
import uuid from "uuid";
import CartBundleItem from "./CartBundleItem";
import CartProductItem from "./CartProductItem";
import CartContext from "../../context/cart/cartContext";
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

  // if (bill === 0) {
  //   return <h4>Your cart is empty</h4>;
  // }

  return (
    <section className="secondary-tile cart">
      <div className="tile clear-btn">
        <button
          className={
            carts.length === 0 || carts[2] === 0
              ? "btn btn-disabled"
              : "btn btn-grayed"
          }
          onClick={onClearCart}
          disabled={carts.length === 0 || carts[2] === 0}
        >
          Clear Cart
        </button>
      </div>
      <ul>
        {products &&
          products.map(cart => <CartProductItem key={uuid.v4()} cart={cart} />)}
        {bundles &&
          bundles.map(cart => <CartBundleItem key={uuid.v4()} cart={cart} />)}
      </ul>
      <div className="tile">
        <p>Bill: {bill ? bill : 0}</p>
        <button
          className="btn btn-accent"
          disabled={carts.length === 0 || carts[2] === 0}
          onClick={createOrder}
        >
          Checkout
        </button>
      </div>
    </section>
  );
};

export default Carts;
