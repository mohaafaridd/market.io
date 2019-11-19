import React, { useMemo, useEffect, useContext } from 'react';
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
				Header: 'Cost',
				accessor: 'cost',
			},
			{
				Header: 'Saved',
				accessor: 'saved',
			},
			{
				Header: 'Revenue',
				accessor: 'revenue',
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
