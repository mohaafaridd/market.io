import React, { useReducer } from 'react';
import axios from 'axios';
import StoreContext from './storeContext';
import storeReducer from './storeReducer';

import {
	SET_ERROR,
	SET_LOADING,
	SET_CURRENT,
	GET_STATISTICS,
	GET_PRODUCTS,
	GET_BUNDLES,
	ADD_PRODUCT,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,
} from '../types';

const StoreState = props => {
	const initialState = {
		statistics: null,
		loading: true,
		current: null,
		error: null,
		products: [],
		bundles: [],
	};

	const [state, dispatch] = useReducer(storeReducer, initialState);

	// Set current product to edit
	const setCurrent = item => {
		dispatch({ type: SET_CURRENT, payload: item });
	};

	// Gets products by store from database
	const getStatistics = async () => {
		try {
			dispatch({ type: SET_LOADING });
			const response = await axios.get(`/api/stores/statistics`);
			dispatch({ type: GET_STATISTICS, payload: response.data });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error });
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
			dispatch({ type: SET_ERROR, payload: error });
		}
	};

	/**
	 * Add a product to the database
	 * Add product item to the state
	 */
	const addProduct = async product => {
		try {
			dispatch({ type: SET_LOADING });
			const response = await axios.post('/api/products', product);
			dispatch({ type: ADD_PRODUCT, payload: response.data });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error });
		}
	};

	/**
	 * Add a product image database
	 * Add product image to the state
	 */
	const addProductImage = async (product, image) => {
		try {
			dispatch({ type: SET_LOADING });
			const formData = new FormData();
			formData.append('image', image);

			const response = await axios.post(
				`/api/products/${product._id}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			);

			const base64Image = Buffer.from(
				response.data.product.image.data,
			).toString('base64');

			dispatch({
				type: UPDATE_PRODUCT,
				payload: { ...response.data.product, image: base64Image },
			});
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error });
		}
	};

	/**
	 * Updates a product item inside the database
	 * Updates product item inside the state
	 */
	const updateProduct = async product => {
		try {
			dispatch({ type: SET_LOADING });
			const { image } = product;
			if (product.image) {
				delete product.image;
			}
			const response = await axios.patch(
				`/api/products/${product._id}`,
				product,
			);
			dispatch({
				type: UPDATE_PRODUCT,
				payload: { ...response.data.product, image },
			});
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error });
		}
	};

	/**
	 * Deletes a product item from the database
	 * Deletes product item from the state
	 */
	const deleteProduct = async product => {
		try {
			dispatch({ type: SET_LOADING });
			await axios.delete(`/api/products/${product._id}`);
			dispatch({ type: DELETE_PRODUCT, payload: product });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error });
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
			dispatch({ type: SET_ERROR, payload: error });
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
				setCurrent,

				getStatistics,

				getProducts,
				addProduct,
				addProductImage,
				updateProduct,
				deleteProduct,

				getBundles,
			}}
		>
			{props.children}
		</StoreContext.Provider>
	);
};

export default StoreState;
