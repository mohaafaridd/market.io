import React, { useMemo, useEffect, useContext } from 'react';
import ProductItem from './ProductItem';
import Table from '../Table';
import ProductContext from '../../../context/product/productContext';
import AuthContext from '../../../context/auth/authContext';

const Products = () => {
	const productContext = useContext(ProductContext);
	const authContext = useContext(AuthContext);

	const {
		getProducts,
		products,
		loading,
		setCurrent,
		deleteProduct,
	} = productContext;
	const { client } = authContext;

	useEffect(() => {
		if (client) {
			getProducts(client._id);
		}
		// eslint-disable-next-line
	}, [client]);

	// Table Columns
	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: '_id',
			},
			{
				Header: 'Category',
				accessor: 'category',
			},
			{
				Header: 'Manufacturer',
				accessor: 'manufacturer',
			},
			{
				Header: 'Name',
				accessor: 'name',
			},
			{
				Header: 'Amount',
				accessor: 'amount',
			},
			{
				Header: 'Price',
				accessor: 'price',
			},
			{
				Header: 'Discount',
				accessor: 'discount',
			},
			{
				Header: 'Revenue',
				accessor: 'color',
			},
			{
				Header: '',
				accessor: 'edit',
				Cell: data => (
					<button onClick={() => setCurrent(data.row.original)}>Edit</button>
				),
			},
			{
				Header: '',
				accessor: 'delete',
				Cell: data => (
					<button onClick={() => deleteProduct(data.row.original)}>
						Delete
					</button>
				),
			},
		],
		[],
	);

	if (loading || !products) {
		return <h4>Loading products...</h4>;
	} else if (products.length === 0) {
		return <h4>You don't have any products to show</h4>;
	}

	return (
		<section className='products-statistics'>
			<Table columns={columns} data={products} />
			<ul className='products-list'>
				{products.map(product => (
					<ProductItem key={product._id} product={product} />
				))}
			</ul>
		</section>
	);
};

export default Products;
