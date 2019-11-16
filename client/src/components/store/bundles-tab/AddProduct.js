import React, { Fragment, useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/auth/authContext';
import BundleContext from '../../../context/bundle/bundleContext';
import ProductContext from '../../../context/product/productContext';
import StoreContext from '../../../context/store/storeContext';

const AddProduct = () => {
	const { client } = useContext(AuthContext);
	const { bundle, product, offers, setProduct, addBundleProduct } = useContext(
		BundleContext,
	);
	const { getProducts, products } = useContext(StoreContext);

	const [state, setState] = useState({
		inBundle: false,
		discount: 0,
	});
	const { inBundle, discount } = state;

	// 1 - Get all products that this store has
	useEffect(() => {
		if (client) {
			const { _id } = client;
			getProducts(_id);
		}
		// eslint-disable-next-line
	}, []);

	// 2 - on product change
	useEffect(() => {
		if (product) {
			const item = offers.find(p => p.product._id === product._id);
			if (item) {
				setState({ ...state, inBundle: true, discount: item.discount });
			} else {
				setState({ ...state, inBundle: false, discount: 0 });
			}
		}
		// eslint-disable-next-line
	}, [product, bundle, offers]);

	// 3 - on select option change
	const onOptionChange = e => {
		const _id = e.target.value;
		const item = products.find(i => _id === i._id);
		if (item) {
			setProduct(item);
		}
	};

	// 4 - on discount change
	const onDiscountChange = e => {
		const value = parseFloat(e.target.value);
		const discount = isNaN(value) ? 0 : value > 100 ? 100 : value;

		setState({ ...state, discount });
	};

	// 5 - Submit product to bundle (Add or Edit)
	const onSubmit = e => {
		e.preventDefault();
		addBundleProduct(bundle, product, discount);
	};

	return (
		<section className='tile add-product'>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='products'>Select a product</label>
					<select
						disabled={!!!bundle}
						className='input'
						name='products'
						id='products'
						onChange={onOptionChange}
						value={product ? product._id : 'default'}
					>
						<option value='default' disabled>
							Select a product
						</option>
						{products.map(product => (
							<option key={product._id} value={product._id}>
								{product.name}
							</option>
						))}
					</select>
				</div>
				<div className='form-group'>
					<label htmlFor='discount'>Discount (%)</label>
					<input
						disabled={!!!bundle}
						className='input'
						placeholder='Discount'
						type='text'
						name='discount'
						id='discount'
						value={discount}
						onChange={onDiscountChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='priceAfterDiscount'>Price after discount</label>
					<input
						placeholder='Price after discount'
						className='input'
						type='text'
						name='priceAfterDiscount'
						id='priceAfterDiscount'
						value={product ? product.price * (1 - discount / 100) : 0}
						disabled
					/>
				</div>
				<button
					disabled={!!!bundle}
					className={`btn ${!!!bundle ? 'btn-disabled' : 'btn-primary'}`}
					type='submit'
				>
					{inBundle ? 'Edit Product' : 'Add Product'}
				</button>
			</form>
		</section>
	);
};

export default AddProduct;
