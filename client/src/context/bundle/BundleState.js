import React, { useReducer } from 'react';
import axios from 'axios';
import BundleContext from './bundleContext';
import bundleReducer from './bundleReducer';

import {
  BUNDLE_ERROR,
  ADD_BUNDLE,
  UPDATE_BUNDLE,
  CLEAR_BUNDLE,
} from '../types';

const BundleState = props => {
  const initialState = {
    bundle: null,
    error: null,
    loading: true,
    product: null,
    products: [],
  };

  const [state, dispatch] = useReducer(bundleReducer, initialState);

  const clearBundle = () => {
    dispatch({ type: CLEAR_BUNDLE });
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
      dispatch({ type: UPDATE_BUNDLE, payload: response.data.bundle });
    } catch (error) {
      dispatch({ type: BUNDLE_ERROR, payload: error });
    }
  };

  return (
    <BundleContext.Provider
      value={{
        bundle: state.bundle,
        error: state.error,
        loading: state.loading,
        product: state.product,
        products: state.products,
        clearBundle,
        createBundle,
        updateBundle,
      }}
    >
      {props.children}
    </BundleContext.Provider>
  );
};

export default BundleState;
