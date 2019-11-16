import { GET_STATISTICS, GET_PRODUCTS, GET_BUNDLES } from '../types';

export default (state, action) => {
	switch (action.type) {
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
