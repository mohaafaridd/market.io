const request = require('supertest');
const app = require('../app');
const Cart = require('../models/cart.model');

const {
  setupDatabase,
  userOneId,
  userOne,
  productOneId,
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should add a valid amount of a product to the cart', async () => {
  const cartBefore = await Cart.findOne({
    owner: userOneId,
    product: productOneId,
  });
  expect(cartBefore.amount).toBe(1);

  const resposne = await request(app)
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

  const resposne = await request(app)
    .post('/carts/api')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      product: {
        id: productOneId,
        amount: 200,
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

  const resposne = await request(app)
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
