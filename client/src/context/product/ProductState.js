import React, { useReducer } from 'react';
import axios from 'axios';
import ProductContext from './productContext';
import productReducer from './productReducer';
import {
  PRODUCT_ERROR,
  ADD_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
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

  // Adds product to database
  const addProduct = async product => {
    try {
      const response = await axios.post('/api/products', product);
      dispatch({ type: ADD_PRODUCT, payload: response.data });
    } catch (error) {
      dispatch({ type: PRODUCT_ERROR, payload: error });
    }
  };

  // Gets products by store from database
  const getProducts = async store => {
    try {
      const response = await axios.get(`/api/stores/p/${store._id}`);
      dispatch({ type: GET_PRODUCTS, payload: response.data });
    } catch (error) {
      dispatch({ type: PRODUCT_ERROR, payload: error });
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        current: state.current,
        error: state.error,
        addProduct,
        getProducts,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
