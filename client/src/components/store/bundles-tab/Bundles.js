import React, { useMemo, useEffect, useContext } from 'react';
import BundleItem from './BundleItem';
import Table from '../Table';

import BundleContext from '../../../context/bundle/bundleContext';
const Bundles = () => {
	const bundleContext = useContext(BundleContext);
	const { bundles, getBundles } = bundleContext;
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

			<ul>
				{bundles.map(bundle => (
					<BundleItem key={bundle._id} bundle={bundle} />
				))}
			</ul>
		</div>
	);
};

export default Bundles;
