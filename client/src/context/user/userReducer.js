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
	CHECK_RATING,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case ADD_CART:
			return state;

		case GET_CARTS:
			return {
				...state,
				carts: action.payload.cart,
				loading: false,
			};

		case EDIT_CART:
		case DELETE_CART:
			return {
				...state,
				carts: action.payload.cart,
			};

		case CLEAR_CART:
		case CREATE_ORDER:
			return {
				...state,
				carts: [],
			};

		case GET_ORDERS:
			return {
				...state,
				orders: action.payload.orders,
				loading: false,
			};

		case CHECK_RATING:
			if (action.payload) {
				return {
					...state,
					ratingAuth: true,
					rating: action.payload.rating.score,
					comment: action.payload.rating.comment,
				};
			} else {
				return {
					...state,
					ratingAuth: false,
					rating: 0,
					comment: '',
				};
			}

		default:
			return state;
	}
};
