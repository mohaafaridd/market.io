const request = require('supertest');
const app = require('../app');
const User = require('../models/user.model');

const { setupDatabase, userOne, userOneId, userTwo } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should register a user', async () => {
  const response = await request(app)
    .post('/user/register')
    .send({
      user: userTwo,
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);

  expect(user).not.toBeNull();
  expect(response.body).toMatchObject({
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    },

    token: user.tokens[1].token,
  });

  expect(user.password).not.toBe(userTwo.password);
});

test('Should not register a user', async () => {
  //   Invalid first name and last name
  await request(app)
    .post('/user/register')
    .send({
      user: { ...userTwo, firstname: '', lastname: '' },
    })
    .expect(400);

  // Invalid email
  await request(app)
    .post('/user/register')
    .send({
      user: { ...userTwo, email: 'mohammedemail' },
    })
    .expect(400);

  // Invalid password
  await request(app)
    .post('/user/register')
    .send({
      user: { ...userTwo, password: '' },
    })
    .expect(400);
});

test('Should login a user', async () => {
  const response = await request(app)
    .post('/user/login')
    .send({
      user: {
        email: userOne.email,
        password: userOne.password,
      },
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login a user', async () => {
  await request(app)
    .post('/user/login')
    .send({
      user: {
        email: 'thiEmailIsFake@gmail.com',
        password: 'fake password',
      },
    })
    .expect(400);
});
