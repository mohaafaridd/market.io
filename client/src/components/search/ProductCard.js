import React from 'react';
import numeral from 'numeral';

const ProductCard = ({ product }) => {
	const { name, description, price } = product;
	const image = Buffer.from(product.image.data).toString('base64');
	return (
		<li className='tile product'>
			<img src={`data:image/jpeg;base64,${image}`} alt={`${name}`} />
			<h5 className='text-xs'>{name}</h5>

			<p className='text-gray-500'>Price</p>
			<p>{numeral(price).format('$0,0.00')}</p>

			<section className='user-action'>
				<button className='btn btn-primary'>
					<i className='fas fa-shopping-cart mr-2'></i>
					Cart
				</button>
				<button className='btn btn-danger'>
					<i className='fas fa-heart mr-2'></i>
					Wishlist
				</button>

				{/* Planned: Favorites */}
				{/* dis-planned: Bundle */}
			</section>
		</li>
	);
};

export default ProductCard;
