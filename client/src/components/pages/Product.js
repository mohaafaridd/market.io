import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import numeral from 'numeral';

import AuthContext from '../../context/auth/authContext';
import GeneralContext from '../../context/general/generalContext';
import UserContext from '../../context/user/userContext';

const Product = () => {
	const { loading, product: result, getProduct, setLoading } = useContext(
		GeneralContext
	);
	const { client } = useContext(AuthContext);
	const { addCart, checkRating, ratingAuth, rating, comment } = useContext(
		UserContext
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
	const { name, description, price, discount } = product;
	const discounted = (1 - discount / 100) * price;

	const onRatingClick = e => {
		checkRating(product);
	};

	return (
		<section className='product-container'>
			{/* Product */}
			<div className='tile info'>
				<h4 className='title'>{name}</h4>
				<section className='flex'>
					<img src={`data:image/jpeg;base64,${image}`} alt={`${name}`} />
					<section className='depth'>
						<section className='prices'>
							<p className={`${discount > 0 ? 'discounted-price' : 'price'}`}>
								{numeral(price).format('$0,0.00')}
							</p>

							{discount > 0 && (
								<p className='price'>{numeral(discounted).format('$0,0.00')}</p>
							)}
						</section>
						<p className='description'>{description}</p>
						{client && client.role === 'User' && (
							<section className='user-actions'>
								<button
									className='btn btn-primary mb-2'
									onClick={e => addCart(product, 'product')}
								>
									<i className='fas fa-shopping-cart mr-2'></i>
									Cart
								</button>

								<button className='btn btn-danger'>
									<i className='fas fa-heart mr-2'></i>
									Wishlist
								</button>
							</section>
						)}
					</section>
				</section>
			</div>

			{client && client.role === 'User' && (
				<section className='w-1/12 mx-auto'>
					<button
						className='btn btn-outlined btn-primary-border'
						onClick={onRatingClick}
					>
						+ Rate
					</button>
				</section>
			)}
			{/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
			<div>
				<ul>
					{ratings.length === 0 && (
						<li className='tile my-2 container mx-auto w-1/3'>
							<p className='text-gray-100 bg-gray-700 rounded-lg p-3'>
								No Comments yet
							</p>
						</li>
					)}
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
		</section>
	);
};

export default Product;
