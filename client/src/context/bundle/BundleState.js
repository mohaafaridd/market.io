import React, { useReducer } from 'react';
import axios from 'axios';
import BundleContext from './bundleContext';
import bundleReducer from './bundleReducer';

import { BUNDLE_ERROR, ADD_BUNDLE } from '../types';

const BundleState = props => {
  const initialState = {
    bundle: null,
    error: null,
    loading: true,
    product: null,
    products: [],
  };

  const [state, dispatch] = useReducer(bundleReducer, initialState);

  const createBundle = async bundle => {
    try {
      const response = await axios.post('/api/bundles', bundle);
      dispatch({ type: ADD_BUNDLE, payload: response.data });
    } catch (error) {
      dispatch({ type: BUNDLE_ERROR, payload: error });
    }
  };

  // const updateBundle = async (bundle) => {
  //   try {
  //     const response = await axios.patch(`/api/bundles/${bundle._id}`, bundle);
  //   } catch (error) {

  //   }
  // }

  return (
    <BundleContext.Provider
      value={{
        bundle: state.bundle,
        error: state.error,
        loading: state.loading,
        product: state.product,
        products: state.products,
        createBundle,
      }}
    >
      {props.children}
    </BundleContext.Provider>
  );
};

export default BundleState;
