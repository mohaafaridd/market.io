import React, { useContext } from "react";
import numeral from "numeral";
import CartContext from "../../context/cart/cartContext";

const CartItem = ({ cart }) => {
  const { product, store, bill, amount } = cart;
  const { editCart, deleteCart } = useContext(CartContext);

  setTimeout(() => {}, 2000);

  const updateAmount = e => {
    e.preventDefault();
    editCart(cart, e.target.value);
  };

  const deleteProductCart = e => {
    e.preventDefault();
    deleteCart(cart);
  };

  return (
    <li className="tile product-item">
      <div className="product-image">
        <img
          src={`data:image/jpeg;base64,${product.image}`}
          alt={`${product.name}`}
        />
      </div>

      <div className="info">
        <p className="text-xl">{product.name}</p>
        {product.discount > 0 && <p>{product.discount}%</p>}
      </div>

      <div className="meta">
        <div className="store">
          <div className="sub-info">
            <p>Store</p>
            <p>{store.name}</p>
          </div>
          <div className="sub-info">
            <p>Unit Price</p>
            <p>{numeral(product.price).format("$0,0.00")}</p>
          </div>
          <div className="sub-info">
            <p>Total Price</p>
            <p>{numeral(bill).format("$0,0.00")}</p>
          </div>
        </div>

        <div className="user">
          <div className="amount">
            <label htmlFor="amount" className="hidden sm:block">
              Amount
            </label>
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

          <button className="btn btn-danger" onClick={deleteProductCart}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
