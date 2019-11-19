import React, { Fragment } from 'react';

import AddBundle from './AddBundle';
import AddOffer from './AddOffer';
import Offers from './Offers';
import Bundles from './Bundles';

const BundlesTab = () => {
	return (
		<section className='bundles-tab'>
			<div className='bundle-control'>
				<AddBundle />
				<AddOffer />
				<Offers />
			</div>
			<div className='bundles-container'>
				<Bundles />
			</div>
		</section>
	);
};

export default BundlesTab;
