import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import BundleCard from '../search/BundleCard';

import GeneralContext from '../../context/general/generalContext';

const Product = () => {
	const { loading, product: result, getProduct, setLoading } = useContext(
		GeneralContext,
	);
	/**
	 * Holds product id
	 * @type {{id: string}}
	 */
	const params = useParams();

	useEffect(() => {
		setLoading();
		getProduct(params.id);
	}, [params.id]);

	if (loading) {
		return <h4>loading product</h4>;
	}

	const [product, bundles, ratings] = result;

	/**
	 * Hold product image in an easy to show format
	 */
	const image = Buffer.from(product.image.data).toString('base64');
	const { name, description } = product;
	return (
		<section className='product-container'>
			{/* Product */}
			<div className='tile'>
				<img src={`data:image/jpeg;base64,${image}`} alt={`${name}`} />
				<h4>{name}</h4>
				<p>{description}</p>
			</div>

			{/* Bundles */}
			<div>
				{bundles.map(bundle => (
					<BundleCard bundle={bundle} />
				))}
			</div>

			<pre>{JSON.stringify(product, null, 2)}</pre>
		</section>
	);
};

export default Product;
