import React, { useReducer } from 'react';
import axios from 'axios';
import BundleContext from './bundleContext';
import bundleReducer from './bundleReducer';

import {
  BUNDLE_ERROR,
  SET_PRODUCT,
  ADD_BUNDLE,
  UPDATE_BUNDLE,
  CLEAR_BUNDLE,
  PUT_BUNDLE_PRODUCT,
  GET_BUNDLES,
  SET_BUNDLE,
  GET_BUNDLE,
} from '../types';

const BundleState = props => {
  const initialState = {
    bundle: null,
    bundles: [],
    product: null,
    products: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(bundleReducer, initialState);

  const clearBundle = () => {
    dispatch({ type: CLEAR_BUNDLE });
  };

  const setBundle = bundle => {
    dispatch({ type: SET_BUNDLE, payload: bundle });
  };

  const setProduct = product => {
    dispatch({ type: SET_PRODUCT, payload: product });
  };

  const getBundles = async () => {
    try {
      const response = await axios.get('/api/bundles');
      dispatch({ type: GET_BUNDLES, payload: response.data });
    } catch (error) {
      dispatch({ type: BUNDLE_ERROR, payload: error });
    }
  };

  const getBundle = async bundle => {
    try {
      const response = await axios.get(`/api/bundles/${bundle._id}`);
      dispatch({ type: GET_BUNDLE, payload: response.data });
    } catch (error) {
      dispatch({ type: BUNDLE_ERROR, payload: error });
    }
  };

  const addBundleProduct = async (bundle, body) => {
    try {
      const response = await axios.put(`/api/bundles/p/${bundle._id}`, {
        product: body.product,
        discount: body.discount,
      });
      dispatch({ type: PUT_BUNDLE_PRODUCT, payload: response.data });
    } catch (error) {
      dispatch({ type: BUNDLE_ERROR, payload: error });
    }
  };

  const createBundle = async bundle => {
    try {
      const response = await axios.post('/api/bundles', bundle);
      dispatch({ type: ADD_BUNDLE, payload: response.data });
    } catch (error) {
      dispatch({ type: BUNDLE_ERROR, payload: error });
    }
  };

  const updateBundle = async bundle => {
    try {
      const response = await axios.patch(`/api/bundles/${bundle._id}`, bundle);
      dispatch({ type: UPDATE_BUNDLE, payload: response.data });
    } catch (error) {
      dispatch({ type: BUNDLE_ERROR, payload: error });
    }
  };

  return (
    <BundleContext.Provider
      value={{
        bundle: state.bundle,
        bundles: state.bundles,
        error: state.error,
        loading: state.loading,
        product: state.product,
        products: state.products,
        addBundleProduct,
        setProduct,
        setBundle,
        clearBundle,
        createBundle,
        updateBundle,
        getBundles,
        getBundle,
      }}
    >
      {props.children}
    </BundleContext.Provider>
  );
};

export default BundleState;
