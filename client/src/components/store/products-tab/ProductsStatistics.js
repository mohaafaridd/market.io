import React, { useMemo, useEffect, useContext } from 'react';
import numeral from 'numeral';
import Table from '../Table';
import AuthContext from '../../../context/auth/authContext';
import StoreContext from '../../../context/store/storeContext';

const Products = () => {
	const authContext = useContext(AuthContext);
	const {
		getProducts,
		deleteProduct,
		products,
		loading,
		setProduct,
	} = useContext(StoreContext);

	const { client } = authContext;

	useEffect(() => {
		if (client) {
			getProducts();
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
				Cell: props => {
					return <span>{numeral(props.cell.value).format('0,0[.]00 $')}</span>;
				},
			},
			{
				Header: 'Discount',
				accessor: 'discount',
			},
			{
				Header: 'Revenue',
				accessor: 'revenue',
				Cell: props => {
					return <span>{numeral(props.cell.value).format('0,0[.]00 $')}</span>;
				},
			},
			{
				Header: 'Sold Units',
				accessor: 'sold',
			},
			{
				Header: '',
				accessor: 'edit',
				Cell: data => (
					<button
						className='btn btn-primary btn-circle-sm'
						onClick={() => setProduct(data.row.original)}
					>
						<i className='fas fa-pen'></i>
					</button>
				),
			},
			{
				Header: '',
				accessor: 'delete',
				Cell: data => (
					<button
						className='btn btn-outlined btn-danger-border btn-circle-sm'
						onClick={() => deleteProduct(data.row.original)}
					>
						<i className='fas fa-trash'></i>
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
		<section className='tile products-statistics'>
			<h3>Products</h3>
			<Table columns={columns} data={products} />
		</section>
	);
};

export default Products;
