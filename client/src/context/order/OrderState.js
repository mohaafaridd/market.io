import React, { useReducer } from 'react';
import axios from 'axios';
import OrderContext from './orderContext';
import orderReducer from './orderReducer';

import {} from '../types';

const OrderState = props => {
  const initialState = {
    orders: [],
  };

  const [state, dispatch] = useReducer(orderReducer, initialState);

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
