import React, { useMemo, useEffect, useContext } from 'react';
import numeral from 'numeral';

import Table from '../Table';

import StoreContext from '../../../context/store/storeContext';
const Bundles = () => {
	const { getBundles, bundles, setBundle, deleteBundle } = useContext(
		StoreContext,
	);
	useEffect(() => {
		getBundles();
		// eslint-disable-next-line
	}, []);

	// Table Columns
	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: '_id',
			},
			{
				Header: 'Name',
				accessor: 'name',
			},
			{
				Header: 'Products',
				Cell: props => {
					return <span>{props.row.original.offers.length}</span>;
				},
			},
			{
				Header: 'Sold',
				accessor: 'sold',
			},
			{
				Header: 'Cost',
				accessor: 'cost',
				Cell: props => {
					return <span>{numeral(props.cell.value).format('0,0[.]00 $')}</span>;
				},
			},
			{
				Header: 'Saved',
				accessor: 'saved',
				Cell: props => {
					return <span>{numeral(props.cell.value).format('0,0[.]00 $')}</span>;
				},
			},
			{
				Header: 'Revenue',
				accessor: 'revenue',
				Cell: props => {
					return <span>{numeral(props.cell.value).format('0,0[.]00 $')}</span>;
				},
			},
			{
				Header: '',
				accessor: 'edit',
				Cell: data => (
					<button
						className='btn btn-primary btn-circle-sm'
						onClick={() => setBundle(data.row.original)}
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
						onClick={() => deleteBundle(data.row.original)}
					>
						<i className='fas fa-trash'></i>
					</button>
				),
			},
		],
		[],
	);

	if (!bundles) {
		return <h3>You have no bundles</h3>;
	}

	return (
		<section className='tile bundles-statistics'>
			<h3>Bundles</h3>
			<Table columns={columns} data={bundles} />
		</section>
	);
};

export default Bundles;
