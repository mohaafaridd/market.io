import React, { useReducer } from 'react';
import axios from 'axios';

import GeneralContext from './generalContext';
import generalReducer from './generalReducer';
import { SET_ERROR, INITIAL_SEARCH } from '../types';

const GeneralState = props => {
	const initialState = {
		searchResults: [],
		filteredSearchResults: [],
		product: null,
		bundle: null,
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

	return (
		<GeneralContext.Provider
			value={{
				searchResults: state.searchResults,
				filteredSearchResults: state.filteredSearchResults,
				product: state.product,
				bundle: state.bundle,

				initialSearch,
			}}
		>
			{props.children}
		</GeneralContext.Provider>
	);
};

export default GeneralState;
