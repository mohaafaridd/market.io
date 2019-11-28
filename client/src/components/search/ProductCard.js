import React from 'react';
import numeral from 'numeral';

const ProductCard = ({ product }) => {
	const { name, description, price, discount } = product;
	const discounted = (1 - discount / 100) * price;
	const image = Buffer.from(product.image.data).toString('base64');

	return (
		<li className='product-container'>
			<figure className='tile product'>
				<img src={`data:image/jpeg;base64,${image}`} alt={`${name}`} />
				<h5 className='title'>{name}</h5>

				<section className='prices'>
					<p className={`${discount > 0 ? 'discounted-price' : 'price'}`}>
						{numeral(price).format('$0,0.00')}
					</p>

					{discount > 0 && (
						<p className='price'>{numeral(discounted).format('$0,0.00')}</p>
					)}
				</section>

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
			</figure>
		</li>
	);
};

export default ProductCard;
