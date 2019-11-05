import React, { useReducer } from 'react';
import axios from 'axios';
import StoreContext from './storeContext';
import storeReducer from './storeReducer';

import { GET_STATISTICS, STATISTICS_ERROR } from '../types';

const StoreState = props => {
  const initialState = {
    statistics: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);

  // Gets products by store from database
  const getStatistics = async () => {
    try {
      const response = await axios.get(`/api/stores/statistics`);
      dispatch({ type: GET_STATISTICS, payload: response.data });
    } catch (error) {
      dispatch({ type: STATISTICS_ERROR, payload: error });
    }
  };

  return (
    <StoreContext.Provider
      value={{
        statistics: state.statistics,
        loading: state.loading,
        getStatistics,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreState;
