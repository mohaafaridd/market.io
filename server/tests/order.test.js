const request = require('supertest');
const app = require('../app');
const Order = require('../models/order.model');

const {
  cartOne,
  courierOne,
  orderOne,
  orderOneId,
  productOneId,
  setupDatabase,
  userOne,
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create an order', async () => {
  const response = await request(app)
    .post(`/orders/api`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      products: [productOneId],
    })
    .expect(201);

  const order = await Order.findById(response.body.order._id);
  expect(order).not.toBeNull();
});

test('Should change the order state to delivered', async () => {
  const orderBefore = await Order.findById(orderOneId);
  expect(orderBefore.delivered).toBeFalsy();

  const response = await request(app)
    .patch(`/orders/api/${orderOneId}`)
    .set('Authorization', `Bearer ${courierOne.tokens[0].token}`)
    .send({
      updates: {
        delivered: true,
      },
    })
    .expect(200);

  const orderAfter = await Order.findById(orderOneId);
  expect(orderAfter.delivered).toBeTruthy();
});
