import React, { useContext, useEffect } from 'react';
import uuid from 'uuid';
import OfferItem from './OfferItem';
import StoreContext from '../../../context/store/storeContext';

const Offers = () => {
	const { offers, bundle } = useContext(StoreContext);

	return (
		<section className='tile products-list-container'>
			<h3>Offers</h3>
			<ul className='alt-tile products-list'>
				{bundle ? (
					offers.length === 0 ? (
						<li className='tile'>No offers</li>
					) : (
						offers.map(offer => {
							return <OfferItem key={uuid.v4()} product={offer} />;
						})
					)
				) : (
					<li className='tile'>Please Select a bundle</li>
				)}
			</ul>
		</section>
	);
};

export default Offers;
