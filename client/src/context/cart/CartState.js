import React, { useReducer } from 'react';
import axios from 'axios';
import CartContext from './cartContext';
import cartReducer from './cartReducer';

import {
  CART_ERROR,
  GET_CARTS,
  EDIT_CART,
  DELETE_CART,
  CLEAR_CART,
} from '../types';

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
      const update = await axios.get('/api/carts');
      dispatch({ type: EDIT_CART, payload: update.data });
    } catch (error) {
      dispatch({ type: CART_ERROR, payload: error.response });
    }
  };

  const deleteCart = async cart => {
    try {
      const response = await axios.delete(`/api/carts/${cart._id}`);
      const update = await axios.get('/api/carts');
      dispatch({ type: DELETE_CART, payload: update.data });
    } catch (error) {
      dispatch({ type: CART_ERROR, payload: error.response });
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete('/api/carts');
      dispatch({ type: CLEAR_CART });
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
        deleteCart,
        clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
