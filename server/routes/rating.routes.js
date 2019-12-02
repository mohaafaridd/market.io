const express = require('express');
const { check, validationResult } = require('express-validator');

const Rating = require('../models/rating.model');
const Order = require('../models/order.model');
// Validate Form
const controller = require('../controllers/search.controller');

// Validate Role
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const Role = require('../middlewares/role');

const router = express.Router();

// @route       GET api/rating/check/:id
// @desc        Checks if user is allowed to post rating about this product
// @access      Private
router.get(
	'/check/:id',
	authorization(Role.User),
	authentication,
	async (req, res) => {
		try {
			const { client: user } = req;
			const { id: product } = req.params;
			const order = await Order.findOne({ user, product, delivered: true });
			if (!order) {
				return res.json({ success: true, privilege: false });
			}

			res.json({ success: true, privilege: true });
		} catch (error) {
			res.json({ success: false, error });
		}
	},
);

// @route       GET api/rating/user/:id
// @desc        Gets user rating of a product
// @access      Private
router.get(
	'/user/:id',
	authorization(Role.User),
	authentication,
	async (req, res) => {
		try {
			const { client: user } = req;
			const { id: product } = req.params;
			const rating = await Rating.findOne({ user, product, store });
			if (!rating) throw new Error("You didn't rate this product yet");
			res.json({ success: true, message: 'Rating found', rating });
		} catch (error) {
			res.json({ success: false, message: error.message, error });
		}
	},
);

// @route       POST api/rating
// @desc        Post user rating about a product
// @access      Private
router.post(
	'/:id',
	authorization(Role.User),
	authentication,
	async (req, res, next) => {
		const { client: user } = req;
		const { id: product } = req.params;
		const order = await Order.findOne({ user, product, delivered: true });
		if (!order) {
			return res.json({ success: false, message: 'No rating privilege' });
		}
		next();
	},
	[
		check('store', 'Store is required')
			.not()
			.isEmpty(),

		check('score', 'Define a score between 0 and 5')
			.not()
			.isEmpty()
			.isInt({ min: 0, max: 5 }),

		check('comment', 'You comment can not exceed 300 characters').isLength({
			min: 0,
			max: 300,
		}),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.mapped() });
			}

			const { client: user } = req;
			const { id: product } = req.params;
			const { store, score = 2.5, comment = '' } = req.body;

			const rating = await Rating.findOneAndUpdate(
				{ user, product, store },
				{ score, comment },
				{ new: true, upsert: true },
			);

			await rating.save();
			res.json({ success: true, message: 'Rating submitted', rating });
		} catch (error) {
			res.json({ success: false, message: 'Rating failed', error });
		}
	},
);

router.get('/:id', async (req, res) => {
	try {
		const ratings = await Rating({ product: req.params.id });
		res.json({ success: true, message: 'Ratings fetched', ratings });
	} catch (error) {
		res.json({ success: false, message: 'Fetching ratings failed', error });
	}
});

module.exports = router;
