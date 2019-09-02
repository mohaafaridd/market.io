const request = require('supertest');
const app = require('../app');
const Order = require('../models/order.model');

const {
  setupDatabase,
  userOne,
  productOneId,
  cartOne,
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create an order', async () => {
  const response = await request(app)
    .post(`/order`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      products: [productOneId],
    })
    .expect(201);

  const order = await Order.findById(response.body.order._id);
  expect(order).not.toBeNull();
});
