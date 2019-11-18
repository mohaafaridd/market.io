import React, { useContext, useEffect } from 'react';
import ProductItem from './ProductItem';
import BundleContext from '../../../context/bundle/bundleContext';
import StoreContext from '../../../context/store/storeContext';

const Products = () => {
	const bundleContext = useContext(BundleContext);
	// const { offers, bundle, getBundle } = bundleContext;
	const { offers, bundle, getBundle } = useContext(StoreContext);
	useEffect(() => {
		if (bundle) {
			getBundle(bundle);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<section className='tile products-list-container'>
			<h3>Products</h3>
			<ul className='alt-tile products-list'>
				{bundle ? (
					offers.length === 0 ? (
						<li className='tile'>No offers</li>
					) : (
						offers.map(item => (
							<ProductItem key={item.product._id} item={item} />
						))
					)
				) : (
					<li className='tile'>Please Select a bundle</li>
				)}
			</ul>
		</section>
	);
};

export default Products;
