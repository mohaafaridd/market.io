import React, { useReducer } from 'react';
import axios from 'axios';
import CartContext from './cartContext';
import cartReducer from './cartReducer';

import { CART_ERROR, GET_CARTS, EDIT_CART } from '../types';

const CartState = props => {
  const initialState = {
    carts: [],
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  const getCarts = async () => {
    try {
      const response = await axios.get('/api/carts');

      dispatch({ type: GET_CARTS, payload: response.data });
    } catch (error) {
      dispatch({ type: CART_ERROR, payload: error.response });
    }
  };

  const editCart = async (cart, amount) => {
    try {
      const response = await axios.patch(`/api/carts/${cart._id}`, { amount });
      const updated = await axios.get('/api/carts');
      dispatch({ type: EDIT_CART, payload: updated.data });
    } catch (error) {
      dispatch({ type: CART_ERROR, payload: error.response });
    }
  };

  return (
    <CartContext.Provider
      value={{
        carts: state.carts,
        getCarts,
        editCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
