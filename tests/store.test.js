const request = require('supertest');
const app = require('../app');
const Role = require('../middlewares/role');
const {
  setupDatabase,
  storeOneId,
  storeOne,
  productOne,
} = require('./fixtures/db');

beforeEach(setupDatabase);

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
