import React, { useReducer } from 'react';
import axios from 'axios';
import BundleContext from './bundleContext';
import bundleReducer from './bundleReducer';

import { BUNDLE_ERROR, ADD_BUNDLE } from '../types';

const BundleState = props => {
  const initialState = {
    products: [],
    loading: true,
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(bundleReducer, initialState);

  return (
    <BundleContext.Provider
      value={{
        products: state.products,
        current: state.current,
        loading: state.loading,
        error: state.error,
      }}
    >
      {props.children}
    </BundleContext.Provider>
  );
};

export default BundleState;
