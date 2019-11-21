const Product = require('../models/product.model');
const Bundle = require('../models/bundle.model');

// TODO: Needs test
/* Query Options */
// 00 - Search by name
// 01 - Select category
// 02 - Select color
// 03 - Select manufacturer
// 04 - Select maximum price
// 05 - Select minimum price
// 06 - Select maximum rating
// 07 - Select minimum rating
// 08 - Select only products (type)
// 09 - Select only bundles (type)
// 10 - Select both bundle and products (default type)
// 11 - Select page (defaults at 1)

// @route       GET api/search
// @desc        Search for bundles or products
// @access      Public
const search = async (req, res) => {
	const {
		name,
		category,
		color,
		manufacturer,
		maxPrice,
		minPrice,
		maxRating,
		minRating,
		type,
		page = 1,
	} = req.query;

	try {
		const products = await Product.aggregate([
			{
				$match: {
					$and: [
						name ? { $text: { $search: name } } : { name: { $exists: true } },
						category ? { category: category } : { category: { $exists: true } },
						color ? { color: color } : { color: { $exists: true } },
						manufacturer
							? { manufacturer: manufacturer }
							: { manufacturer: { $exists: true } },
						maxPrice
							? { price: { $lte: parseInt(maxPrice) } }
							: { price: { $exists: true } },
						minPrice
							? { price: { $gte: parseInt(minPrice) } }
							: { price: { $exists: true } },
						maxRating
							? { score: { $lte: parseInt(maxRating) } }
							: { score: { $exists: true } },
						minRating
							? { score: { $gte: parseInt(minRating) } }
							: { score: { $exists: true } },
					],
				},
			},

			{
				// -1 to get from page 1
				$skip: 10 * (page - 1),
			},
		]);

		const bundles = await Bundle.aggregate([
			{
				$match: {
					$and: [
						name ? { $text: { $search: name } } : { name: { $exists: true } },
					],
				},
			},

			{
				$lookup: {
					from: 'products',
					localField: 'offers.product',
					foreignField: '_id',
					as: 'products',
				},
			},

			{
				$addFields: {
					products: {
						// Maps the offers to get their product id and offer discount and merge it with the original product
						$map: {
							input: '$offers',
							in: {
								$mergeObjects: [
									{
										$arrayElemAt: [
											'$products',
											{
												$indexOfArray: ['$products._id', '$$this.product'],
											},
										],
									},
									'$$this',
								],
							},
						},
					},
				},
			},

			{
				$project: {
					name: '$name',
					products: '$products',
					store: '$store',
					saved: {
						$sum: {
							$map: {
								input: '$products',
								as: 'product',
								in: {
									$multiply: [
										'$$product.price',

										// discount = 10%
										// then it's 0.9 of the price
										// ((100 - 10)/100)
										{
											$divide: ['$$product.discount', 100],
										},
									],
								},
							},
						},
					},
					bill: {
						$sum: {
							$map: {
								input: '$products',
								as: 'product',
								in: {
									$multiply: [
										'$$product.price',

										// discount = 10%
										// then it's 0.9 of the price
										// ((100 - 10)/100)
										{
											$divide: [
												{ $subtract: [100, '$$product.discount'] },
												100,
											],
										},
									],
								},
							},
						},
					},
				},
			},

			{
				$match: {
					$and: [
						maxPrice
							? { bill: { $lte: parseInt(maxPrice) } }
							: { bill: { $exists: true } },
						minPrice
							? { bill: { $gte: parseInt(minPrice) } }
							: { bill: { $exists: true } },
					],
				},
			},

			{
				// -1 to get from page 1
				$skip: 10 * (page - 1),
			},
		]);
		res.json({ products, bundles });
	} catch (error) {
		res.json({ error });
	}
};

module.exports = {
	search,
};
