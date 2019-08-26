const request = require('supertest');
const app = require('../app');
const Product = require('../models/product.model');

const {
  setupDatabase,
  storeOne,
  storeId,
  productOne,
  productOneId,
} = require('./fixtures/db');

beforeEach(setupDatabase);

const deafaultProduct = {
  category: 'Mobile Phone',
  manufacturer: 'Honor',
  name: 'Honor 8x',
  description: 'Cool ass phone',
  model: '8x',
  color: 'blue',
  amount: 10,
  discount: 5,
};

test('Should create product for store', async () => {
  const response = await request(app)
    .post('/product')
    .set('Authorization', `Bearer ${storeOne.tokens[0].token}`)
    .send({
      product: deafaultProduct,
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
