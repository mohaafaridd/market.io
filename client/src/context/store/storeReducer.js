import {
	GET_STATISTICS,
	GET_PRODUCTS,
	GET_BUNDLES,
	SET_LOADING,
	ADD_PRODUCT,
	UPDATE_PRODUCT,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_LOADING:
			return {
				...state,
				loading: true,
			};

		case GET_STATISTICS:
			return {
				...state,
				statistics: action.payload.statistics[0],
				loading: false,
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
				current: action.payload.product,
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
				current: {
					...action.payload,
					image: action.payload.image,
				},
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
