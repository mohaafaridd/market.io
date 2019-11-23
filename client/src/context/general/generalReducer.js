import { INITIAL_SEARCH, FILTER_RESULTS } from '../types';

export default (state, action) => {
	switch (action.type) {
		case INITIAL_SEARCH: {
			const { products, bundles } = action.payload;
			return {
				...state,
				searchResults: [products, bundles],
				products,
				bundles,
				filtered: products,
			};
		}
		case FILTER_RESULTS: {
			const { products, bundles } = action.payload;
			return {
				...state,
				filteredSearchResults: [products, bundles],
				filtered: products,
				bundles,
			};
		}

		default:
			break;
	}
};
