import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import uuid from 'uuid';

import SearchFilters from './SearchFilters';
import Products from './Products';

import GeneralContext from '../../context/general/generalContext';
const Search = () => {
	/**
	 * Page Location (query)
	 */
	let location = useLocation();

	const {
		products,
		bundles,
		filtered,
		initialSearch,
		filterResults,
	} = useContext(GeneralContext);

	useEffect(() => {
		const { name } = queryString.parse(location.search);
		initialSearch(name);
		// eslint-disable-next-line
	}, [name]);

	useEffect(() => {
		const {
			name,
			category,
			manufacturer,
			color,
			maxPrice = Infinity,
			minPrice = 0,
		} = queryString.parse(location.search);

		const filters = {
			categories: category ? decodeURIComponent(category).split(',') : [],
			manufacturers: manufacturer
				? decodeURIComponent(manufacturer).split(',')
				: [],
			colors: color ? decodeURIComponent(color).split(',') : [],
			price: {
				max: maxPrice,
				min: minPrice,
			},
		};

		filterResults(filters, name);
	}, []);

	return (
		<section className='search-results'>
			<h4>Search Results</h4>

			<SearchFilters />

			<Products />

			<h5>Bundles</h5>
			<ul>
				{bundles.map(bundle => (
					<li key={uuid.v4()}> {bundle.name} </li>
				))}
			</ul>
		</section>
	);
};

export default Search;
