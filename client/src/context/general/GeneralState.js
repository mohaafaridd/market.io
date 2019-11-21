import React, { useReducer } from 'react';
import axios from 'axios';

import GeneralContext from './generalContext';
import generalReducer from './generalReducer';

const GeneralState = props => {
	const initialState = {
		searchResults: [],
		filteredSearchResults: [],
		product: null,
		bundle: null,
	};

	const [state, dispatch] = useReducer(generalReducer, initialState);

	return (
		<GeneralContext.Provider
			value={{
				searchResults: state.searchResults,
				filteredSearchResults: state.filteredSearchResults,
				product: state.product,
				bundle: state.bundle,
			}}
		>
			{props.children}
		</GeneralContext.Provider>
	);
};

export default GeneralState;
