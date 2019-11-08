import React, { useReducer } from 'react';
import axios from 'axios';
import ProductContext from './productContext';
import productReducer from './productReducer';
import {
  PRODUCT_ERROR,
  ADD_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  SET_CURRENT,
  CLEAR_CURRENT,
} from '../types';

const ProductState = props => {
  const initialState = {
    // Store Products
    products: [],
    loading: true,
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  // Set current product to edit
  const setCurrent = product => {
    dispatch({ type: SET_CURRENT, payload: product });
  };

  // Adds product to database
  const addProduct = async product => {
    try {
      const response = await axios.post('/api/products', product);
      dispatch({ type: ADD_PRODUCT, payload: response.data });
      return { response: response.data.product };
    } catch (error) {
      dispatch({ type: PRODUCT_ERROR, payload: error });
    }
  };

  // Gets products by store from database
  const getProducts = async store => {
    try {
      const response = await axios.get(`/api/stores/p/${store}`);
      dispatch({ type: GET_PRODUCTS, payload: response.data });
    } catch (error) {
      dispatch({ type: PRODUCT_ERROR, payload: error });
    }
  };

  const updateProduct = async product => {
    try {
      console.log('in product state');
      console.log('product', product);
      const response = await axios.patch(
        `/api/products/${product._id}`,
        product
      );
      dispatch({ type: UPDATE_PRODUCT, payload: response.data.product });
    } catch (error) {
      dispatch({ type: PRODUCT_ERROR, payload: error });
    }
  };

  const postProductImage = async (product, image) => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      const response = await axios.post(
        `/api/products/${product._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      dispatch({ type: UPDATE_PRODUCT, payload: response.data.product });
    } catch (error) {
      dispatch({ type: PRODUCT_ERROR, payload: error });
    }
  };

  const deleteProduct = async product => {
    try {
      await axios.delete(`/api/products/${product._id}`);
      dispatch({ type: DELETE_PRODUCT, payload: product });
    } catch (error) {
      dispatch({ type: PRODUCT_ERROR, payload: error });
    }
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const searchProductByName = async name => {
    try {
      const response = await axios.get(`/api/search?name=${name}`);
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
        loading: state.loading,
        error: state.error,

        setCurrent,
        addProduct,
        getProducts,
        updateProduct,
        deleteProduct,
        clearCurrent,
        postProductImage,

        searchProductByName,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
