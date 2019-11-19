const request = require('supertest');
const faker = require('faker');
const app = require('../app');
const User = require('../models/user.model');

const { setupDatabase, userOne, userOneId, userTwo } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should register a user', async () => {
  const response = await request(app)
    .post('/users/api/register')
    .send({
      user: userTwo,
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);

  expect(user).not.toBeNull();
  expect(response.body).toMatchObject({
    user: {
      name: user.name,
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
    .post('/users/api/register')
    .send({
      user: { ...userTwo, name: '' },
    })
    .expect(400);

  // Invalid email
  await request(app)
    .post('/users/api/register')
    .send({
      user: { ...userTwo, email: 'mohammedemail' },
    })
    .expect(400);

  // Invalid password
  await request(app)
    .post('/users/api/register')
    .send({
      user: { ...userTwo, password: '' },
    })
    .expect(400);
});

test('Should login a user', async () => {
  const response = await request(app)
    .post('/users/api/login')
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
    .post('/users/api/login')
    .send({
      user: {
        email: 'thiEmailIsFake@gmail.com',
        password: 'fake password',
      },
    })
    .expect(400);
});

test('Should logout a user', async () => {
  const userBefore = await User.findById(userOneId);
  expect(userBefore.tokens).toHaveLength(1);

  const response = await request(app)
    .post('/users/api/logout')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  const userAfter = await User.findById(userOneId);
  expect(userAfter.tokens).toHaveLength(0);
});

test('Should let the user change his password', async () => {
  const newPassword = faker.internet.password(10);
  const newEmail = faker.internet.email();

  await request(app)
    .patch('/users/api')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      updates: {
        phone: '01012227424',
        password: newPassword,
        email: newEmail,
      },
    })
    .expect(200);

  await request(app)
    .post('/users/api/login')
    .send({
      user: {
        email: newEmail,
        password: newPassword,
      },
    })
    .expect(200);
});
