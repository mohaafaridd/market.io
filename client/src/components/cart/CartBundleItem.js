import React, { useContext } from "react";
import uuid from "uuid";
import numeral from "numeral";
import CartContext from "../../context/cart/cartContext";

const CartItem = ({ cart }) => {
  const { products, name, store, amount } = cart;
  const { editCart, deleteCart } = useContext(CartContext);

  const saved = numeral(cart.saved).format("$0,0.00");
  const bill = numeral(cart.bill).format("$0,0.00");

  const updateAmount = e => {
    e.preventDefault();
    editCart(cart, e.target.value);
  };

  const deleteBundleCart = e => {
    e.preventDefault();
    deleteCart(cart);
  };

  return (
    <li className="alt-tile bundle-item my-2">
      <div className="tile header">
        <p>{name}</p>
        <div className="info">
          <div className="pricing">
            <div className="sub-info">
              <p>Total Price</p>
              <p>{bill}</p>
            </div>
            <div className="sub-info">
              <p>Saved</p>
              <p>{saved}</p>
            </div>

            <div className="sub-info">
              <p>Store</p>
              <p>{store.name}</p>
            </div>
          </div>

          <div className="options">
            <div className="amount">
              <select
                className="input"
                name="amount"
                id="amount"
                defaultValue={amount}
                onChange={updateAmount}
              >
                <option value="default" disabled>
                  Amount
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <button className="btn btn-danger" onClick={deleteBundleCart}>
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="products">
        <ul>
          {products.map(product => (
            <li className="tile" key={uuid.v4()}>
              <p>{product.name}</p>
              <p>rate: {product.score ? product.score : "Not Rated"}</p>
              <p>Discount: {product.discount}%</p>
              <p>Unit Price: {product.price}</p>
              <p>After: {product.price * ((100 - product.discount) / 100)}</p>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default CartItem;
