import React, { useReducer } from 'react';
import axios from 'axios';
import StoreContext from './storeContext';
import storeReducer from './storeReducer';

import {
	GET_STATISTICS,
	STATISTICS_ERROR,
	SET_LOADING,
	GET_PRODUCTS,
	GET_BUNDLES,
} from '../types';

const StoreState = props => {
	const initialState = {
		statistics: null,
		loading: true,
		current: null,
		products: [],
		bundles: [],
	};

	const [state, dispatch] = useReducer(storeReducer, initialState);

	// Gets products by store from database
	const getStatistics = async () => {
		try {
			dispatch({ type: SET_LOADING });
			const response = await axios.get(`/api/stores/statistics`);
			dispatch({ type: GET_STATISTICS, payload: response.data });
		} catch (error) {
			dispatch({ type: STATISTICS_ERROR, payload: error });
		}
	};

	/* Products Actions */

	/**
	 * Get All products of this store with statistics from the database
	 */
	const getProducts = async () => {
		try {
			dispatch({ type: SET_LOADING });
			const response = await axios.get(`/api/stores/statistics/products`);
			dispatch({ type: GET_PRODUCTS, payload: response.data });
		} catch (error) {
			dispatch({ type: STATISTICS_ERROR, payload: error });
		}
	};

	/* Bundles Actions */

	/**
	 * Get All products of this store with statistics from the database
	 */
	const getBundles = async () => {
		try {
			dispatch({ type: SET_LOADING });
			const response = await axios.get(`/api/stores/statistics/bundles`);
			dispatch({ type: GET_BUNDLES, payload: response.data });
		} catch (error) {
			dispatch({ type: STATISTICS_ERROR, payload: error });
		}
	};

	return (
		<StoreContext.Provider
			value={{
				statistics: state.statistics,
				loading: state.loading,
				current: state.current,
				products: state.products,
				bundles: state.bundles,
				getStatistics,
				getProducts,
				getBundles,
			}}
		>
			{props.children}
		</StoreContext.Provider>
	);
};

export default StoreState;
