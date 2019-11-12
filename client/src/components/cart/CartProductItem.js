import React, { useContext } from "react";
import CartContext from "../../context/cart/cartContext";

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

  console.log("product", product);

  return (
    <li className="tile product-item">
      <img
        className="product-image"
        src={`data:image/jpeg;base64,${product.image}`}
        alt={`${product.name}`}
      />

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
            <p>{product.price}</p>
          </div>
          <div className="sub-info">
            <p>Total Price</p>
            <p>{bill}</p>
          </div>
        </div>

        <div className="user">
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

          <button className="btn btn-danger" onClick={deleteProductCart}>
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
