import { SET_LOADING, INITIAL_SEARCH, FILTER_RESULTS } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_LOADING: {
			return {
				...state,
				loading: true,
			};
		}

		case INITIAL_SEARCH: {
			const { products, bundles } = action.payload;
			return {
				...state,
				searchResults: [products, bundles],
				products,
				bundles,
				filtered: products,
				loading: false,
			};
		}
		case FILTER_RESULTS: {
			const { products, bundles } = action.payload;
			return {
				...state,
				filteredSearchResults: [products, bundles],
				filtered: products,
				bundles,
				loading: false,
			};
		}

		default:
			break;
	}
};
