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
				<ul className='flex'>
					{bundles.map(bundle => (
						<BundleCard bundle={bundle} />
					))}
				</ul>
			</div>

			{/* Ratings */}
			<div>
				{/* User */}
				{/* Comments */}
				<ul>
					{ratings.map(rate => (
						<li className='tile my-2 container mx-auto w-1/3'>
							<h5 className='flex justify-between'>
								{rate.user.name}
								<span>
									{[...Array(rate.score)].map(e => (
										<span className='text-blue-600'>★</span>
									))}
									{[...Array(5 - rate.score)].map(e => (
										<span className='text-blue-100'>★</span>
									))}
								</span>
							</h5>

							{rate.comment && (
								<p className='text-gray-100 bg-gray-700 rounded-lg p-3'>
									{rate.comment}
								</p>
							)}
						</li>
					))}
				</ul>
			</div>

			{/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
		</section>
	);
};

export default Product;
