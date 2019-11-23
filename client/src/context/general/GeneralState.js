import React, { useReducer } from 'react';
import axios from 'axios';

import GeneralContext from './generalContext';
import generalReducer from './generalReducer';
import { SET_ERROR, INITIAL_SEARCH, FILTER_RESULTS } from '../types';

const GeneralState = props => {
	const initialState = {
		searchResults: [],
		filteredSearchResults: [],
		products: [],
		bundles: [],
		filtered: [],
		error: null,
	};

	const [state, dispatch] = useReducer(generalReducer, initialState);

	/**
	 * Initial search using product or bundle name
	 * @param {string} name product or bundle name
	 */
	const initialSearch = async name => {
		try {
			const response = await axios.get(`/api/search?name=${name}`);
			dispatch({ type: INITIAL_SEARCH, payload: response.data });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error });
		}
	};

	/**
	 * Filters the products array in state due to user selected fitlers
	 * @param {array} filters state from search filter component
	 * @param {string} name product or bundle name
	 */
	const filterResults = async (filters, name) => {
		try {
			const categories =
				filters.categories.length > 0
					? encodeURIComponent(filters.categories.join(','))
					: null;
			const url = `/api/search?name=${name}${
				categories ? `&category=${categories}` : ''
			}`;

			const response = await axios.get(url);
			dispatch({ type: FILTER_RESULTS, payload: response.data });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error });
		}
	};

	return (
		<GeneralContext.Provider
			value={{
				searchResults: state.searchResults,
				filteredSearchResults: state.filteredSearchResults,
				products: state.products,
				bundles: state.bundles,
				filtered: state.filtered,

				initialSearch,
				filterResults,
			}}
		>
			{props.children}
		</GeneralContext.Provider>
	);
};

export default GeneralState;
