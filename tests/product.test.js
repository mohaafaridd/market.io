const request = require('supertest');
const app = require('../app');
const Product = require('../models/product.model');
const User = require('../models/user.model');

const {
  setupDatabase,
  storeOne,
  storeId,
  productOne,
  productOneId,
  productTwo,
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create product for store', async () => {
  const response = await request(app)
    .post('/product')
    .set('Authorization', `Bearer ${storeOne.tokens[0].token}`)
    .send({
      product: productTwo,
    })
    .expect(201);

  const product = await Product.findById(response.body.product._id);
  expect(product).not.toBeNull();
});

test('Should get product from store', async () => {
  const response = await request(app)
    .get(`/product/${productOneId}`)
    .expect(200);

  expect(response.body).toMatchObject({
    product: {
      ...productOne,
      _id: productOneId.toHexString(),
      store: storeId.toHexString(),
    },
  });
});

test('Should edit a product from store', async () => {
  const response = await request(app)
    .patch(`/product/${productOneId}`)
    .set('Authorization', `Bearer ${storeOne.tokens[0].token}`)
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
      store: storeId.toHexString(),
    },
  });
});

test('Should delete a product', async () => {
  await request(app)
    .delete(`/product/${productOneId}`)
    .set('Authorization', `Bearer ${storeOne.tokens[0].token}`)
    .expect(200);

  const product = await Product.findById(productOneId);
  expect(product).toBeNull();
});
