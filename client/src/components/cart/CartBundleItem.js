import React, { useContext } from "react";
import uuid from "uuid";
import CartContext from "../../context/cart/cartContext";

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
    <li className="alt-tile my-2">
      <p className="tile">{name}</p>
      <ul>
        {products.map(product => (
          <li className="tile my-2" key={uuid.v4()}>
            <img
              className="product-image"
              src={`data:image/jpeg;base64,${product.image}`}
              alt={`${product.name}`}
            />
            <p>{product.name}</p>
            <p>rate: {product.score ? product.score : "Not Rated"}</p>
            <p>Discount: {product.discount}%</p>
            <p>Unit Price: {product.price}</p>
            <p>After: {product.price * ((100 - product.discount) / 100)}</p>
          </li>
        ))}
      </ul>
      <div className="tile">
        <p>Total Price: {bill}</p>
        <p>Saved: {saved}</p>
        <p>Store: {store.name}</p>
      </div>

      <div className="tile my-2">
        <label htmlFor="amount">Amount </label>
        <select
          className="input"
          name="amount"
          id="amount"
          defaultValue={amount}
          onChange={updateAmount}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <button className="btn btn-danger" onClick={deleteBundleCart}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default CartItem;
