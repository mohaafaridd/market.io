import React, { useContext } from 'react';
import uuid from 'uuid';

import BundleCard from './BundleCard';

import GeneralContext from '../../context/general/generalContext';
const Bundles = () => {
	const { bundles } = useContext(GeneralContext);

	return (
		<section className='bundles-results'>
			<h5>Bundles</h5>
			<ul className='bundles-list'>
				{bundles.length < 1 && (
					<li className='no-result'>No bundles were found</li>
				)}
				{bundles.map(bundle => (
					<BundleCard key={uuid.v4()} bundle={bundle} />
				))}
			</ul>
		</section>
	);
};

export default Bundles;
