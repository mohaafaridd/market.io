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
} from '../types';

export default (state, action) => {
	switch (action.type) {
		// General
		case SET_LOADING:
			return {
				...state,
				loading: true,
			};

		// Main Statistics
		case GET_STATISTICS:
			return {
				...state,
				statistics: action.payload.statistics[0],
				loading: false,
			};

		// Products
		case SET_PRODUCT:
			return {
				...state,
				product: action.payload,
			};

		case CLEAR_PRODUCT:
			return {
				...state,
				product: null,
			};

		case GET_PRODUCTS:
			return {
				...state,
				products: action.payload.products,
				loading: false,
			};

		case ADD_PRODUCT:
			return {
				...state,
				product: action.payload.product,
				products: [...state.products, action.payload.product],
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
				product: {
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
				product: null,
				error: null,
				loading: false,
			};

		case GET_BUNDLES:
			return {
				...state,
				bundles: action.payload.bundles,
				loading: false,
			};

		default:
			return state;
	}
};
