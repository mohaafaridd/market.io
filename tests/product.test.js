const request = require('supertest');
const app = require('../app');
const Product = require('../models/product.model');

const {
  productOne,
  productOneId,
  productThreeId,
  productTwo,
  setupDatabase,
  storeOne,
  storeOneId,
  userOne,
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create product for store', async () => {
  const response = await request(app)
    .post('/products/api')
    .set('Authorization', `Bearer ${storeOne.tokens[0].token}`)
    .send({
      product: productTwo,
    })
    .expect(201);

  const product = await Product.findById(response.body.product._id);
  expect(product).not.toBeNull();
});

test('Should rate a product', async () => {
  const rateBefore = await Product.findById(productOneId);
  await task.populate('owner').execPopulate();
  expect(rateBefore.ratings).toHaveLength(0);

  await request(app)
    .patch('/products/api/rate')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      product: productOneId,
      rating: 5,
    })
    .expect(200);

  const rateAfter = await Product.findById(productOneId);
  expect(rateAfter.ratings).toHaveLength(1);
});

test('Should change rate a product', async () => {
  const rateBefore = await Product.findById(productThreeId);
  expect(rateBefore.ratings[0].rating).toBe(5);

  await request(app)
    .patch('/products/api/rate')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      product: productThreeId,
      rating: 2,
    })
    .expect(200);

  const rateAfter = await Product.findById(productThreeId);
  expect(rateAfter.ratings[0].rating).toBe(2);
});

test('Should add image to product in store', async () => {
  await request(app)
    .patch(`/products/api/${productOneId}/picture`)
    .set('Authorization', `Bearer ${storeOne.tokens[0].token}`)
    .attach('picture', 'tests/fixtures/img.png')
    .expect(200);

  const product = await Product.findById(productOneId);
  expect(product.picture).toEqual(expect.any(Buffer));
});

// test('Should get product from store', async () => {
//   const response = await request(app)
//     .get(`/products/api/${productOneId}`)
//     .expect(200);

//   expect(response.body).toMatchObject({
//     product: {
//       ...productOne,
//       _id: productOneId.toHexString(),
//       store: storeOneId.toHexString(),
//     },
//   });
// });

test('Should edit a product from store', async () => {
  const response = await request(app)
    .patch(`/products/api/${productOneId}`)
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
      store: storeOneId.toHexString(),
    },
  });
});

test('Should delete a product', async () => {
  await request(app)
    .delete(`/products/api/${productOneId}`)
    .set('Authorization', `Bearer ${storeOne.tokens[0].token}`)
    .expect(200);

  const product = await Product.findById(productOneId);
  expect(product).toBeNull();
});
