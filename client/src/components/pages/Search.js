import React, { useContext, useEffect } from 'react';
import queryString from 'query-string';
import uuid from 'uuid';
import SearchItem from './SearchItem';
import GeneralContext from '../../context/general/generalContext';
const Search = ({ location }) => {
	const { searchResults, initialSearch } = useContext(GeneralContext);

	useEffect(() => {
		const { name } = queryString.parse(location.search);
		initialSearch(name);
		// eslint-disable-next-line
	}, [location.search]);

	if (searchResults.length < 1) {
		return <h4>Loading</h4>;
	}

	// if (products.length === 0) {
	//   return <h4>No match was found</h4>;
	// }

	console.log('searchResults', searchResults);

	return (
		<div>
			<h4>Search Results</h4>

			<h5>Products</h5>

			<ul>
				{/* {products.map(product => (
          <SearchItem product={product} key={uuid.v4()} />
        ))} */}
			</ul>
		</div>
	);
};

export default Search;
