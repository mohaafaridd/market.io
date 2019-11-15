import React, { useContext } from 'react';
import ProductContext from '../../../context/product/productContext';

const ProductItem = ({ product }) => {
	const productContext = useContext(ProductContext);
	const { image, name, amount, price, discount } = product;
	const { setCurrent, deleteProduct } = productContext;

	const editProduct = () => {
		setCurrent(product);
	};

	const onDelete = () => {
		deleteProduct(product);
	};

	if (!product) {
		return <h4>Loading</h4>;
	}

	return (
		<li className='tile product-item'>
			<div className='field'>
				<p>{name}</p>
			</div>
			<div className='field'>
				<p>{amount}</p>
			</div>
			<div className='field'>
				<p>${price}</p>
			</div>
			<div className='field'>
				<p>{discount}%</p>
			</div>
			<div className='field'>
				<button className='btn btn-primary' onClick={editProduct}>
					<i className='fas fa-pencil-alt'></i>
				</button>
			</div>
			<div className='field'>
				<button
					className='btn btn-outlined btn-danger-border'
					onClick={onDelete}
				>
					<i className='fas fa-trash-alt'></i>
				</button>
			</div>
		</li>
	);
};

export default ProductItem;
