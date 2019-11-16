import React, { useMemo, useEffect, useContext } from 'react';
import Table from '../Table';

import StoreContext from '../../../context/store/storeContext';
const Bundles = () => {
	const { getBundles, bundles } = useContext(StoreContext);
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
		],
		[],
	);

	if (!bundles) {
		return <h3>You have no bundles</h3>;
	}

	console.log('bundles', bundles);

	return (
		<div>
			<h3>All your bundles</h3>
			<h3>Count: {bundles.length}</h3>
			<Table columns={columns} data={bundles} />
		</div>
	);
};

export default Bundles;
