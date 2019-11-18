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

		// Bundles
		case SET_BUNDLE:
			return {
				...state,
				bundle: action.payload,
				offers: action.payload.products,
			};

		case CLEAR_BUNDLE:
			return {
				...state,
				bundle: null,
			};

		case GET_BUNDLES:
			return {
				...state,
				bundles: action.payload.bundles,
				loading: false,
			};

		case GET_BUNDLE:
			return {
				...state,
				offers: action.payload.bundle.offers,
			};

		case ADD_BUNDLE:
			return {
				...state,
				bundle: action.payload.bundle,
				error: null,
				loading: false,
				product: null,
				offers: [],
				bundles: [...state.bundles, action.payload.bundle],
			};

		case UPDATE_BUNDLE:
			return {
				...state,
				loading: false,
				bundles: state.bundles.map(bundle =>
					bundle._id === action.payload.bundle._id
						? action.payload.bundle
						: bundle,
				),
			};

		case PUT_PRODUCT:
			return {
				...state,
				bundle: action.payload.bundle,
				bundles: state.bundles.map(bundle =>
					bundle._id === action.payload.bundle._id
						? action.payload.bundle
						: bundle,
				),
				offers: action.payload.bundle.offers,
				error: null,
				loading: false,
			};

		case REMOVE_PRODUCT:
			return {
				...state,
				bundle: action.payload.bundle,
				bundles: state.bundles.map(bundle =>
					bundle._id === action.payload.bundle._id
						? action.payload.bundle
						: bundle,
				),
				offers: action.payload.bundle.offers,
				product: null,
				error: null,
				loading: false,
			};

		case DELETE_BUNDLE:
			return {
				...state,
				loading: false,
				bundle: null,
				bundles: state.bundles.filter(
					bundle => bundle._id !== action.payload.bundle._id,
				),
				offers: [],
				product: null,
			};

		default:
			return state;
	}
};
