import React, { useState } from 'react';
import uuid from 'uuid';
const SearchFilters = ({ bundles, products }) => {
	const prices = {
		products: {
			max: Math.max(...products.map(product => product.price)),
			min: Math.min(...products.map(product => product.price)),
		},
		bundles: {
			max: Math.max(...bundles.map(bundle => bundle.bill)),
			min: Math.min(...bundles.map(bundle => bundle.bill)),
		},
		total: {
			max: 0,
			min: 0,
		},
	};

	const categories = [...new Set(products.map(product => product.category))];
	const colors = [...new Set(products.map(product => product.color))];
	const manufacturers = [
		...new Set(products.map(product => product.manufacturer)),
	];
	prices.total.max = Math.max(prices.products.max, prices.bundles.max);
	prices.total.min = Math.min(prices.products.min, prices.bundles.min);

	const [filters, setFilters] = useState({
		categories: [],
		manufacturers: [],
		colors: [],
		price: {
			min: prices.total.min || 0,
			max: prices.total.max || Infinity,
		},
	});

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

	return (
		<section className='search-fitlers'>
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
				<input type='text' disabled value={filters.price.min} />
				<input
					type='range'
					name='min-price'
					id='min-price'
					max={filters.price.max}
					min={prices.total.min}
					step={1}
					value={filters.price.min}
					onChange={e =>
						setFilters({
							...filters,
							price: {
								max: filters.price.max,
								min: e.target.value,
							},
						})
					}
				/>
			</div>

			<div className='filter-group'>
				<label htmlFor='min-price'>Maximum Price</label>
				<input type='text' disabled value={filters.price.max} />
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
		</section>
	);
};

export default SearchFilters;
