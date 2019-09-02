const request = require('supertest');
const app = require('../app');
const { setupDatabase, storeOne, productOne } = require('./fixtures/db');

beforeEach(setupDatabase);

test('gets a store data', async () => {
  const response = await request(app)
    .get(`/store/${storeOne.username}`)
    .expect(200);
});
