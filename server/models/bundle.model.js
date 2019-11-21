const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const schema = new Schema({
	name: {
		type: String,
		required: true,
	},

	store: {
		type: ObjectId,
		ref: 'User',
	},

	offers: [
		{
			_id: false,
			product: { type: ObjectId, ref: 'Product' },
			discount: {
				type: Number,
				default: 0,
				min: 0,
				max: 100,
				required: true,
			},
		},
	],
});

schema.index({ name: 'text' });

const Bundle = model('Bundle', schema);

module.exports = Bundle;
