import React, { useReducer } from 'react';
import axios from 'axios';
import ProductContext from './productContext';
import productReducer from './productReducer';
import {
  ADD_PRODUCT,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from '../types';

const ProductState = props => {
  const initialState = {
    products: null,
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        current: state.current,
        error: state.error,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
