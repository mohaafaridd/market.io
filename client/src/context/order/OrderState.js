import React, { useReducer } from 'react';
import axios from 'axios';
import OrderContext from './orderContext';
import orderReducer from './orderReducer';

import { GET_ORDERS, ORDER_ERROR } from '../types';

const OrderState = props => {
  const initialState = {
    orders: [],
  };

  const [state, dispatch] = useReducer(orderReducer, initialState);

  const getOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      dispatch({ type: GET_ORDERS, payload: response.data });
    } catch (error) {
      dispatch({ type: ORDER_ERROR, payload: error.response });
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        getOrders,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
