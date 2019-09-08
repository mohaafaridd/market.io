const request = require('supertest');
const app = require('../app');

const Product = require('../models/product.model');

const {
  adminOne,
  adminOneId,
  productOne,
  productOneId,
  setupDatabase,
  storeOneId,
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should edit product as an administrator', async () => {
  const response = await request(app)
    .patch(`/products/api/${productOneId}`)
    .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
    .send({
      updates: {
        name: 'S10+',
        amount: 20,
        discount: 10,
      },
    })
    .expect(200);

  expect(response.body).toMatchObject({
    product: {
      ...productOne,
      name: 'S10+',
      amount: 20,
      discount: 10,
      _id: productOneId.toHexString(),
      store: storeOneId.toHexString(),
    },
  });
});
