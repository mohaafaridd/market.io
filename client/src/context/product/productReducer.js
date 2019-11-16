import {
	SET_CURRENT,
	CLEAR_CURRENT,
	PRODUCT_ERROR,
	ADD_PRODUCT,
	GET_PRODUCTS,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_CURRENT:
			return { ...state, current: action.payload };

		case CLEAR_CURRENT:
			return { ...state, current: null };

		case ADD_PRODUCT:
			return {
				...state,
				current: action.payload.product,
				products: [...state.products, action.payload.product],
				error: null,
				loading: false,
			};

		case GET_PRODUCTS:
			return {
				...state,
				products: action.payload.products,
				current: null,
				error: null,
				loading: false,
			};

		case UPDATE_PRODUCT:
			return {
				...state,
				products: state.products.map(product =>
					product._id === action.payload._id
						? {
								...action.payload,
								revenue: product.revenue,
								sold: product.sold,
								image: action.payload.image,
						  }
						: product,
				),
				current: {
					...action.payload,
					image: action.payload.image,
				},
				error: null,
				loading: false,
			};

		case DELETE_PRODUCT:
			return {
				...state,
				products: state.products.filter(
					product => product._id !== action.payload._id,
				),
				current: null,
				error: null,
				loading: false,
			};

		case PRODUCT_ERROR:
			return {
				...state,
				products: null,
				current: null,
				error: action.payload.error,
				loading: false,
			};

		default:
			return state;
	}
};
