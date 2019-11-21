import {
	SET_ERROR,
	SET_LOADING,
	// Carts
	ADD_CART,
	GET_CARTS,
	EDIT_CART,
	DELETE_CART,
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

		default:
			break;
	}
};
