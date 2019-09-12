const request = require('supertest');
const app = require('../app');
const Courier = require('../models/courier.model');

const {
  setupDatabase,
  courierOneId,
  courierOne,
  courierTwo,
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should register a courier', async () => {
  const response = await request(app)
    .post('/couriers/api/register')
    .send({
      courier: courierTwo,
    })
    .expect(201);

  const courier = await Courier.findById(response.body.courier._id);

  expect(courier).not.toBeNull();
  expect(response.body).toMatchObject({
    courier: {
      name: courier.name,
      email: courier.email,
      phone: courier.phone,
    },

    token: courier.tokens[1].token,
  });

  expect(courier.password).not.toBe(courierTwo.password);
});

test('Should login a courier', async () => {
  const response = await request(app)
    .post('/couriers/api/login')
    .send({
      courier: {
        email: courierOne.email,
        password: courierOne.password,
      },
    })
    .expect(200);

  const courier = await Courier.findById(courierOneId);
  expect(response.body.token).toBe(courier.tokens[1].token);
});

test('Should logout a courier', async () => {
  const response = await request(app)
    .post('/couriers/api/logout')
    .set('Authorization', `Bearer ${courierOne.tokens[0].token}`)
    .expect(200);

  const courier = await Courier.findById(courierOneId);
  expect(courier.tokens).toHaveLength(0);
});
