import React, { useReducer } from 'react';
import axios from 'axios';

import UserContext from './userContext';
import userReducer from './userReducer';

import {
	SET_ERROR,
	SET_LOADING,
	// Carts
	ADD_CART,
	GET_CARTS,
	EDIT_CART,
	DELETE_CART,
	CLEAR_CART,
	// Orders
	CREATE_ORDER,
	GET_ORDERS,
	// Ratings
	CHECK_RATING,
} from '../types';

const UserState = props => {
	const initialState = {
		loading: true,
		carts: [],
		orders: [],
		ratingAuth: false,
		rating: 0,
		comment: '',
	};

	const [state, dispatch] = useReducer(userReducer, initialState);

	// Carts Action

	/**
	 * Adds an item to cart
	 * @param {*} item
	 * @param {*} type bundle or product
	 */
	const addCart = async (item, type) => {
		try {
			await axios.post('/api/carts', { [type]: item._id });
			dispatch({ type: ADD_CART, payload: { item, type } });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error.response });
		}
	};

	/**
	 * Gets all user carts
	 */
	const getCarts = async () => {
		try {
			const response = await axios.get('/api/carts');
			dispatch({ type: GET_CARTS, payload: response.data });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error.response });
		}
	};

	/**
	 * Edits a cart amount
	 * @param {*} cart the item
	 * @param {*} amount the new amount
	 */
	const editCart = async (cart, amount) => {
		try {
			await axios.patch(`/api/carts/${cart._id}`, { amount });
			const update = await axios.get('/api/carts');
			dispatch({ type: EDIT_CART, payload: update.data });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error.response });
		}
	};

	/**
	 * Deletes a cart
	 * @param {*} cart
	 */
	const deleteCart = async cart => {
		try {
			await axios.delete(`/api/carts/${cart._id}`);
			const update = await axios.get('/api/carts');
			dispatch({ type: DELETE_CART, payload: update.data });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error.response });
		}
	};

	/**
	 * Clears user carts from database and state
	 */
	const clearCart = async () => {
		try {
			await axios.delete('/api/carts');
			dispatch({ type: CLEAR_CART });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error.response });
		}
	};

	/**
	 * Creates an order of all the items in user carts
	 */
	const createOrder = async () => {
		try {
			const response = await axios.post('/api/orders');
			dispatch({ type: CREATE_ORDER, payload: response.data });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error.response });
		}
	};

	/**
	 * Fetches all user carts from database
	 */
	const getOrders = async () => {
		try {
			const response = await axios.get('/api/orders');
			dispatch({ type: GET_ORDERS, payload: response.data });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error.response });
		}
	};

	const checkRating = async product => {
		try {
			const response = await axios.get(`/api/ratings/check/${product._id}`);
			if (response.data.privilege) {
				const rate = await axios.get(`/api/ratings/user/${product._id}`);
				dispatch({ type: CHECK_RATING, payload: rate.data });
			} else {
				dispatch({ type: CHECK_RATING });
			}
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error.response });
		}
	};

	return (
		<UserContext.Provider
			value={{
				loading: state.loading,
				carts: state.carts,
				orders: state.orders,
				ratingAuth: state.ratingAuth,
				rating: state.rating,
				comment: state.comment,

				addCart,
				getCarts,
				editCart,
				deleteCart,
				clearCart,

				createOrder,
				getOrders,

				checkRating,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserState;
