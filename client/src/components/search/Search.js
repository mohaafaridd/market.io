import React, { useContext, useEffect } from 'react';
import queryString from 'query-string';
import uuid from 'uuid';

import SearchFilters from './SearchFilters';

import GeneralContext from '../../context/general/generalContext';
const Search = ({ location }) => {
	const { products, bundles, filtered, initialSearch } = useContext(
		GeneralContext,
	);

	useEffect(() => {
		const { name } = queryString.parse(location.search);
		initialSearch(name);
		// eslint-disable-next-line
	}, [location.search]);

	if (filtered.length < 1) {
		return <h4>Loading</h4>;
	}

	return (
		<div>
			<h4>Search Results</h4>

			<SearchFilters bundles={bundles} products={products} />

			<h5>Products</h5>
			<ul>
				{filtered.map(product => (
					<li key={uuid.v4()}> {product.name} </li>
				))}
			</ul>

			<h5>Bundles</h5>
			<ul>
				{bundles.map(bundle => (
					<li key={uuid.v4()}> {bundle.name} </li>
				))}
			</ul>
		</div>
	);
};

export default Search;
