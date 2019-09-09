const request = require('supertest');
const app = require('../app');
const Cart = require('../models/cart.model');

const {
  setupDatabase,
  userOneId,
  userOne,
  productOneId,
  productOne,
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should add a valid amount of a product to the cart', async () => {
  const cartBefore = await Cart.findOne({
    owner: userOneId,
    product: productOneId,
  });
  expect(cartBefore.amount).toBe(1);

  const response = await request(app)
    .post('/carts/api')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      product: {
        id: productOneId,
        amount: 1,
      },
    })
    .expect(200);

  const cartAfter = await Cart.findOne({
    owner: userOneId,
    product: productOneId,
  });
  expect(cartAfter.amount).toBe(2);
});

test('Should not add an invalid amount of a product to the cart', async () => {
  const cartBefore = await Cart.findOne({
    owner: userOneId,
    product: productOneId,
  });
  expect(cartBefore.amount).toBe(1);

  const response = await request(app)
    .post('/carts/api')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      product: {
        id: productOneId,
        amount: 2000,
      },
    })
    .expect(400);

  const cartAfter = await Cart.findOne({
    owner: userOneId,
    product: productOneId,
  });
  expect(cartAfter.amount).toBe(1);
});

test('Should delete product from cart with valid data', async () => {
  const cartBefore = await Cart.findOne({
    owner: userOneId,
    product: productOneId,
  });
  expect(cartBefore.amount).toBe(1);

  const response = await request(app)
    .delete('/carts/api')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      products: [productOneId],
    })
    .expect(200);

  const cartAfter = await Cart.findOne({
    owner: userOneId,
    product: productOneId,
  });
  expect(cartAfter).toBeNull();
});

test('Should delete all items in user cart', async () => {
  const { booked } = productOne;

  await request(app)
    .delete('/carts/api/all')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  const response = await request(app).get(`/products/api/${productOneId}`);

  expect(response.body.product.booked).toBe(booked - 1);
});
