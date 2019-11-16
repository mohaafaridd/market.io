const Product = require('../models/product.model');
const Bundle = require('../models/bundle.model');
const Order = require('../models/order.model');

// @route       GET api/stores/statistics
// @desc        Get store statistics
// @access      Private
const getStatistics = async (req, res) => {
	// // TODO: Aggregation to get the following
	// // 1 - Products count (ref: products)
	// // 2 - Bundles count (ref: bundles)
	// // 3 - Total Sales (ref: orders)
	// // 4 - Net profit (ref: orders)
	// // 5 - Products (ref: products)
	// //6 - Bundles (ref: bundles)
	try {
		const { client: store } = req;
		const statistics = await Order.aggregate([
			{ $match: { store: store._id } },
			{
				$group: {
					_id: null,
					bundles: {
						$sum: {
							$cond: {
								if: { $ne: ['$bundle', null] },
								then: '$amount',
								else: 0,
							},
						},
					},

					sellingGraph: {
						$push: {
							type: {
								$cond: {
									if: { $eq: ['$bundle', null] },
									then: 'product',
									else: 'bundle',
								},
							},
							amount: '$amount',
							date: '$createdAt',
						},
					},

					profitGraph: {
						$push: {
							type: {
								$cond: {
									if: { $eq: ['$bundle', null] },
									then: 'product',
									else: 'bundle',
								},
							},

							profit: {
								$multiply: [
									'$amount',
									'$price',
									{
										$subtract: [
											1,
											{
												$divide: ['$discount', 100],
											},
										],
									},
								],
							},

							date: '$createdAt',
						},
					},

					bundleProfit: {
						$sum: {
							$cond: {
								if: { $ne: ['$bundle', null] },
								then: {
									$multiply: [
										'$amount',
										'$price',
										{
											$subtract: [
												1,
												{
													$divide: ['$discount', 100],
												},
											],
										},
									],
								},
								else: 0,
							},
						},
					},

					products: {
						$sum: {
							$cond: {
								if: { $eq: ['$bundle', null] },
								then: '$amount',
								else: 0,
							},
						},
					},

					productProfit: {
						$sum: {
							$cond: {
								if: { $eq: ['$bundle', null] },
								then: {
									$multiply: [
										'$amount',
										'$price',
										{
											$subtract: [
												1,
												{
													$divide: ['$discount', 100],
												},
											],
										},
									],
								},
								else: 0,
							},
						},
					},
				},
			},

			{
				$project: {
					bundles: '$bundles',
					products: '$products',
					profit: {
						products: '$productProfit',
						bundles: '$bundleProfit',
						total: { $sum: ['$productProfit', '$bundleProfit'] },
					},
					graph: {
						amount: {
							product: {
								$filter: {
									input: '$sellingGraph',
									as: 'trade',
									cond: { $eq: ['$$trade.type', 'product'] },
								},
							},
							bundle: {
								$filter: {
									input: '$sellingGraph',
									as: 'trade',
									cond: { $eq: ['$$trade.type', 'bundle'] },
								},
							},
						},
						profit: {
							product: {
								$filter: {
									input: '$profitGraph',
									as: 'trade',
									cond: { $eq: ['$$trade.type', 'product'] },
								},
							},
							bundle: {
								$filter: {
									input: '$profitGraph',
									as: 'trade',
									cond: { $eq: ['$$trade.type', 'bundle'] },
								},
							},
						},
					},
				},
			},
		]);

		if (statistics.length === 0) {
			const response = {
				bundles: 0,
				products: 0,
				profit: {
					products: 0,
					bundles: 0,
					total: 0,
				},
				graph: {
					amount: {
						product: [],
						bundle: [],
					},
					profit: {
						product: [],
						bundle: [],
					},
				},
			};

			statistics.push(response);
		}

		res.status(200).json({
			success: true,
			message: 'Statistics fetched successfully',
			statistics,
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message, error });
	}
};

// @route       GET api/stores/statistics/products
// @desc        Get store products statistics
// @access      Private
const getProducts = async (req, res) => {
	try {
		const { client: store } = req;
		const products = await Product.aggregate([
			{ $match: { store: store._id } },
			{
				$lookup: {
					from: 'orders',
					localField: '_id',
					foreignField: 'product',
					as: 'orders',
				},
			},
			{
				$addFields: {
					revenue: {
						$sum: {
							$map: {
								input: '$orders',
								as: 'order',
								in: {
									$multiply: [
										'$$order.amount',
										'$$order.price',
										{
											$subtract: [
												1,
												{
													$divide: ['$$order.discount', 100],
												},
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
				$addFields: {
					sold: {
						$sum: '$orders.amount',
					},
				},
			},
		]);

		res.json({ success: true, message: 'Search complete', products });
	} catch (error) {
		res
			.status(400)
			.json({ success: false, message: 'Search failed', error: error.message });
	}
};

// @route       GET api/stores/statistics/bundles
// @desc        Get store bundles statistics
// @access      Private
const getBundles = async (req, res) => {
	try {
		const { client: store } = req;

		const bundles = await Bundle.aggregate([
			{ $match: { store: store._id } },
			{
				$lookup: {
					from: 'products',
					localField: 'offers.product',
					foreignField: '_id',
					as: 'products',
				},
			},

			// Calculate Cost and Saved Amount
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
					cost: {
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

			// Calculate Revenue and sold units
			{
				$lookup: {
					from: 'orders',
					localField: '_id',
					foreignField: 'bundle',
					as: 'orders',
				},
			},

			{
				$project: {
					name: '$name',
					products: '$products',
					store: '$store',
					saved: '$saved',
					cost: '$cost',

					revenue: {
						$sum: {
							$map: {
								input: '$orders',
								as: 'order',
								in: {
									$multiply: [
										'$$order.price',
										'$$order.amount',
										// discount = 10%
										// then it's 0.9 of the price
										// ((100 - 10)/100)
										{
											$divide: [{ $subtract: [100, '$$order.discount'] }, 100],
										},
									],
								},
							},
						},
					},
				},
			},
		]);
		res.json({ success: true, message: 'Search complete', bundles });
	} catch (error) {
		res.status(400).json({ success: false, message: 'Search failed', error });
	}
};

module.exports = {
	getStatistics,
	getProducts,
	getBundles,
};
