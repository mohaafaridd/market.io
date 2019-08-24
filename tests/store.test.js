const request = require('supertest');
const app = require('../app');
const Store = require('../models/store.model');

const { setupDatabase, storeOne, storeId } = require('./fixtures/db');

beforeEach(setupDatabase);

const defaultStore = {
  name: 'El Badr',
  username: 'badr',
  phones: ['01012227425'],
  emails: ['badr@gmail.com'],
  password: '123456',
};

test('Should register a store', async () => {
  const response = await request(app)
    .post('/store/register')
    .send({
      store: defaultStore,
    })
    .expect(201);

  const store = await Store.findById(response.body.store._id);

  expect(store).not.toBeNull();

  expect(response.body).toMatchObject({
    store: {
      name: defaultStore.name,
      username: defaultStore.username,
      phones: defaultStore.phones,
      emails: defaultStore.emails,
    },

    token: store.tokens[0].token,
  });

  expect(store.password).not.toBe(defaultStore.password);
});

test('Should not register a store', async () => {
  // Invalid phone number
  await request(app)
    .post('/store/register')
    .send({
      store: { ...defaultStore, phones: ['0101222742455'] },
    })
    .expect(400);

  // Invalid email
  await request(app)
    .post('/store/register')
    .send({
      store: { ...defaultStore, emails: ['elbadrgroup'] },
    })
    .expect(400);

  // Invalid password
  await request(app)
    .post('/store/register')
    .send({
      store: { ...defaultStore, password: '' },
    })
    .expect(400);
});

test('Should login a store', async () => {
  const response = await request(app)
    .post('/store/login')
    .send({
      store: {
        username: storeOne.username,
        password: storeOne.password,
      },
    })
    .expect(200);

  const store = await Store.findById(storeId);
  expect(response.body.token).toBe(store.tokens[1].token);
});

test('Should not login a store', async () => {
  await request(app)
    .post('/store/login')
    .send({
      user: {
        username: 'fakeUsername',
        password: 'fake password',
      },
    })
    .expect(400);
});
