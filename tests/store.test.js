const request = require('supertest');
const app = require('../app');
const Store = require('../models/store.model');
const Role = require('../middlewares/role');
const {
  productOne,
  setupDatabase,
  storeOne,
  storeOneId,
  storeTwo,
  storeTwoId,
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should register a store', async () => {
  const response = await request(app)
    .post('/stores/api/register')
    .send({
      store: storeTwo,
    })
    .expect(201);

  const store = await Store.findById(storeTwoId);

  expect(store).not.toBeNull();
  expect(response.body).toMatchObject({
    store: {
      name: store.name,
      username: store.username,
      email: store.email,
      phone: store.phone,
    },

    token: store.tokens[1].token,
  });

  expect(store.password).not.toBe(storeTwo.password);
});

test('Should login a store', async () => {
  const response = await request(app)
    .post('/stores/api/login')
    .send({
      store: {
        email: storeOne.email,
        password: storeOne.password,
      },
    })
    .expect(200);

  const store = await Store.findById(storeOneId);
  expect(response.body.token).toBe(store.tokens[1].token);
});

test('Should logout a store', async () => {
  const storeBefore = await Store.findById(storeOneId);
  expect(storeBefore.tokens).toHaveLength(1);

  const response = await request(app)
    .post('/stores/api/logout')
    .set('Authorization', `Bearer ${storeOne.tokens[0].token}`)
    .expect(200);

  const storeAfter = await Store.findById(storeOneId);
  expect(storeAfter.tokens).toHaveLength(0);
});

test('gets a store data', async () => {
  const response = await request(app)
    .get(`/stores/api/${storeOne.username}`)
    .expect(200);

  expect(response.body).toMatchObject({
    store: {
      role: Role.Store,
      name: storeOne.name,
      username: storeOne.username,
      email: storeOne.email,
      phone: storeOne.phone,
    },

    products: [
      {
        category: productOne.category,
        manufacturer: productOne.manufacturer,
        name: productOne.name,
        store: storeOneId.toHexString(),
      },
    ],
  });
});
