import React, { useReducer } from 'react';
import axios from 'axios';
import StoreContext from './storeContext';
import storeReducer from './storeReducer';

import {
	SET_ERROR,
	SET_LOADING,
	GET_STATISTICS,
	// Products
	SET_PRODUCT,
	CLEAR_PRODUCT,
	ADD_PRODUCT,
	GET_PRODUCT,
	GET_PRODUCTS,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,
	// Bundles
	SET_BUNDLE,
	CLEAR_BUNDLE,
	ADD_BUNDLE,
	GET_BUNDLE,
	GET_BUNDLES,
	UPDATE_BUNDLE,
	PUT_PRODUCT,
	REMOVE_PRODUCT,
	DELETE_BUNDLE,
} from '../types';

const StoreState = props => {
	const initialState = {
		statistics: null,
		loading: true,
		error: null,
		product: null,
		bundle: null,
		products: [],
		bundles: [],
		offers: [],
	};

	const [state, dispatch] = useReducer(storeReducer, initialState);

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

	// Set current product to edit
	const setProduct = product => {
		dispatch({ type: SET_PRODUCT, payload: product });
	};

	// Clear current product
	const clearProduct = () => {
		dispatch({ type: CLEAR_PRODUCT });
	};

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

	// Set current product to edit
	const setBundle = bundle => {
		dispatch({ type: SET_BUNDLE, payload: bundle });
	};

	// Clear current product
	const clearBundle = () => {
		dispatch({ type: CLEAR_BUNDLE });
	};

	const addBundle = async bundle => {
		try {
			const response = await axios.post('/api/bundles', bundle);
			dispatch({ type: ADD_BUNDLE, payload: response.data });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error });
		}
	};

	const getBundle = async bundle => {
		try {
			const response = await axios.get(`/api/bundles/${bundle._id}`);
			dispatch({ type: GET_BUNDLE, payload: response.data });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error });
		}
	};

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

	const updateBundle = async bundle => {
		try {
			const response = await axios.patch(`/api/bundles/${bundle._id}`, bundle);
			dispatch({ type: UPDATE_BUNDLE, payload: response.data });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error });
		}
	};

	const putProduct = async (bundle, product, discount) => {
		try {
			const response = await axios.put(`/api/bundles/p/${bundle._id}`, {
				product: product._id,
				discount: discount,
			});
			dispatch({ type: PUT_PRODUCT, payload: response.data });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error });
		}
	};

	const removeProduct = async (bundle, product) => {
		try {
			const response = await axios.patch(`/api/bundles/p/${bundle._id}`, {
				product: product._id,
			});
			dispatch({ type: REMOVE_PRODUCT, payload: response.data });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error });
		}
	};

	const deleteBundle = async bundle => {
		try {
			const response = await axios.delete(`/api/bundles/${bundle._id}`);
			dispatch({ type: DELETE_BUNDLE, payload: response.data });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error });
		}
	};

	return (
		<StoreContext.Provider
			value={{
				statistics: state.statistics,
				loading: state.loading,
				product: state.product,
				bundle: state.bundle,
				products: state.products,
				bundles: state.bundles,
				offers: state.offers,

				getStatistics,

				setProduct,
				clearProduct,
				getProducts,
				addProduct,
				addProductImage,
				updateProduct,
				deleteProduct,

				setBundle,
				clearBundle,
				addBundle,
				getBundle,
				getBundles,
				updateBundle,
				putProduct,
				removeProduct,
				deleteBundle,
			}}
		>
			{props.children}
		</StoreContext.Provider>
	);
};

export default StoreState;
