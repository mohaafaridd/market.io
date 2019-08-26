const request = require('supertest');
const app = require('../app');
const User = require('../models/user.model');

const { setupDatabase, userOne, userOneId } = require('./fixtures/db');

beforeEach(setupDatabase);

const defaultUser = {
  firstname: 'Mohammed',
  lastname: 'Adel',
  email: 'adel@gmail.com',
  phone: '01124597562',
  password: '5791355',
};

test('Should register a user', async () => {
  const response = await request(app)
    .post('/user/register')
    .send({
      user: defaultUser,
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  expect(response.body).toMatchObject({
    user: {
      firstname: defaultUser.firstname,
      lastname: defaultUser.lastname,
      email: defaultUser.email,
      phone: defaultUser.phone,
    },

    token: user.tokens[0].token,
  });

  expect(user.password).not.toBe(defaultUser.password);
});

test('Should not register a user', async () => {
  //   Invalid first name and last name
  await request(app)
    .post('/user/register')
    .send({
      user: { ...defaultUser, firstname: '', lastname: '' },
    })
    .expect(400);

  // Invalid email
  await request(app)
    .post('/user/register')
    .send({
      user: { ...defaultUser, email: 'mohammedemail' },
    })
    .expect(400);

  // Invalid password
  await request(app)
    .post('/user/register')
    .send({
      user: { ...defaultUser, password: '' },
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
