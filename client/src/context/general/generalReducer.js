import { INITIAL_SEARCH } from '../types';

export default (state, action) => {
	switch (action.type) {
		case INITIAL_SEARCH:
			const { products, bundles } = action.payload;
			return {
				...state,
				searchResults: [products, bundles],
			};
			break;

		default:
			break;
	}
};
