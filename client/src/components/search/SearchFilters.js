import React, { useState, useContext, useEffect } from 'react';
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import uuid from 'uuid';

import GeneralContext from '../../context/general/generalContext';
const SearchFilters = () => {
	const { products, bundles, filtered, filterResults } = useContext(
		GeneralContext,
	);

	/**
	 * Page Location (query)
	 */
	const location = useLocation();

	/**
	 * Browser history to track filtering
	 */
	const history = useHistory();

	/**
	 * hold search value
	 * @type {string}
	 */
	const { name } = queryString.parse(location.search);

	const [properties, setProperties] = useState({
		categories: [],
		colors: [],
		manufacturers: [],
		prices: {
			products: {
				max: Infinity,
				min: 0,
			},
			bundles: {
				max: Infinity,
				min: 0,
			},
			get total() {
				const max = Math.max(this.products.max, this.bundles.max);
				const min = Math.min(this.products.min, this.bundles.min);
				return { max, min };
			},
		},
	});

	const { categories, colors, manufacturers, prices } = properties;

	const [filters, setFilters] = useState({
		categories: [],
		colors: [],
		manufacturers: [],
		price: {
			min: prices.total.min || 0,
			max: prices.total.max || Infinity,
		},
	});

	// runs for the main search point
	// contains all categories, colors, etc.
	useEffect(() => {
		setProperties({
			...properties,
			categories: [...new Set(products.map(product => product.category))],
			colors: [...new Set(products.map(product => product.color))],
			manufacturers: [
				...new Set(products.map(product => product.manufacturer)),
			],

			prices: {
				products: {
					max: Math.max(...filtered.map(product => product.price)),
					min: Math.min(...filtered.map(product => product.price)),
				},
				bundles: {
					max: Math.max(...bundles.map(bundle => bundle.bill)),
					min: Math.min(...bundles.map(bundle => bundle.bill)),
				},
				get total() {
					const max = Math.max(this.products.max, this.bundles.max);
					const min = Math.min(this.products.min, this.bundles.min);
					return { max, min };
				},
			},
		});
	}, [products, filtered, bundles]);

	// runs whenever filtered products change
	useEffect(() => {
		setFilters({
			...filters,
			price: {
				max: prices.total.max,
				min: prices.total.min,
			},
		});
	}, [filtered]);

	useEffect(() => {
		console.log('properties', properties);
	}, [properties]);

	const onCheckboxCheck = e => {
		const { name } = e.target;
		const value = e.target.id;

		setFilters({
			...filters,
			[name]: filters[name].find(f => f === value)
				? filters[name].filter(f => f !== value)
				: [...filters[name], value],
		});
	};

	const onFilter = e => {
		filterResults(filters, name);
		const categories =
			filters.categories.length > 0
				? encodeURIComponent(filters.categories.join(','))
				: null;

		const manufacturers =
			filters.manufacturers.length > 0
				? encodeURIComponent(filters.manufacturers.join(','))
				: null;

		const colors =
			filters.colors.length > 0
				? encodeURIComponent(filters.colors.join(','))
				: null;

		const url = `/search?name=${name}
			${categories ? `&category=${categories}` : ''}
			${manufacturers ? `&manufacturer=${manufacturers}` : ''}
			${colors ? `&color=${colors}` : ''}
			`;

		history.replace(url);
	};

	return (
		<section className='search-filters'>
			<div className='filter-group'>
				<p>Category</p>
				{categories.map(category => (
					<div key={uuid.v4()} className='filter-option'>
						<input
							type='checkbox'
							name='categories'
							id={category}
							onChange={onCheckboxCheck}
							checked={
								filters.categories.find(cat => cat === category) ? true : false
							}
						/>{' '}
						<label htmlFor={category}>{category}</label>
					</div>
				))}
			</div>

			<div className='filter-group'>
				<p>Manufacturer</p>
				{manufacturers.map(manufacturer => (
					<div key={uuid.v4()} className='filter-option'>
						<input
							type='checkbox'
							name='manufacturers'
							id={manufacturer}
							onChange={onCheckboxCheck}
							checked={
								filters.manufacturers.find(manu => manu === manufacturer)
									? true
									: false
							}
						/>{' '}
						<label htmlFor={manufacturer}>{manufacturer}</label>
					</div>
				))}
			</div>

			<div className='filter-group'>
				<p>Colors</p>
				{colors.map(color => (
					<div key={uuid.v4()} className='filter-option'>
						<input
							type='checkbox'
							name='colors'
							id={color}
							onChange={onCheckboxCheck}
							checked={filters.colors.find(col => col === color) ? true : false}
						/>{' '}
						<label htmlFor={color}>{color}</label>
					</div>
				))}
			</div>

			<div className='filter-group'>
				<p>Price Range</p>
				<label htmlFor='min-price'>Minimum Price</label>
				<input
					className='input'
					type='text'
					disabled
					value={filters.price.min}
				/>
				<input
					type='range'
					name='min-price'
					id='min-price'
					max={filters.price.max}
					min={prices.total.min}
					step={1}
					onChange={e =>
						setFilters({
							...filters,
							price: {
								max: filters.price.max,
								min: e.target.value,
							},
						})
					}
					value={filters.price.min}
				/>
			</div>

			<div className='filter-group'>
				<label htmlFor='min-price'>Maximum Price</label>
				<input
					className='input'
					type='text'
					disabled
					value={filters.price.max}
				/>
				<input
					type='range'
					name='min-price'
					id='min-price'
					max={prices.total.max}
					min={filters.price.min}
					step={1}
					value={filters.price.max}
					onChange={e =>
						setFilters({
							...filters,
							price: {
								min: filters.price.min,
								max: e.target.value,
							},
						})
					}
				/>
			</div>

			<button className='btn btn-accent' onClick={onFilter}>
				Filter
			</button>
		</section>
	);
};

export default SearchFilters;
