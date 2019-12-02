import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import GeneralContext from '../../context/general/generalContext';

const Product = () => {
	const { loading, product, getProduct, setLoading } = useContext(
		GeneralContext,
	);
	/**
	 * Holds product id
	 * @type {{id: string}}
	 */
	const params = useParams();

	useEffect(() => {
		setLoading();
		getProduct(params.id);
	}, [params.id]);

	if (loading || !product) {
		return <h4>loading product</h4>;
	}

	/**
	 * Hold product image in an easy to show format
	 */
	const image = Buffer.from(product.image.data).toString('base64');
	const { name, description } = product;
	return (
		<div>
			<img src={`data:image/jpeg;base64,${image}`} alt={`${name}`} />
			<h4>{name}</h4>
			<p>{description}</p>
			<pre>{JSON.stringify(product, null, 2)}</pre>
		</div>
	);
};

export default Product;
