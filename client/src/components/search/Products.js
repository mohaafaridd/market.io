import React, { useContext } from 'react';
import uuid from 'uuid';

import ProductCard from './ProductCard';

import GeneralContext from '../../context/general/generalContext';
const Products = () => {
	const { filtered } = useContext(GeneralContext);
	return (
		<section className='products-results'>
			<h5>Products</h5>
			<ul className='products-list'>
				{filtered.length < 1 && (
					<li className='no-result'>No products were found</li>
				)}
				{filtered.map(product => (
					<ProductCard key={uuid.v4()} product={product} />
				))}
			</ul>
		</section>
	);
};

export default Products;
