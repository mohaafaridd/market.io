import React from 'react';

const ProductCard = ({ product }) => {
	const { name, description, price } = product;
	const image = Buffer.from(product.image.data).toString('base64');
	return (
		<li className='tile'>
			<img src={`data:image/jpeg;base64,${image}`} alt={`${name}`} />
			<h3>{name}</h3>
			<p>{description}</p>

			<p>Price</p>
			<p>{price}</p>

			<div>
				<button className='btn btn-primary'>
					<i className='fas fa-shopping-cart mr-2'></i>
					Cart
				</button>

				{/* Planned: Favorites */}
				{/* Planned: Bundle */}
			</div>
		</li>
	);
};

export default ProductCard;
