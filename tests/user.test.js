const request = require('supertest');
const app = require('../app');
const User = require('../models/user.model');

const {
  setupDatabase,
  userOne,
  userOneId,
  userTwo,
  userTwoId,
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('User Registration', async () => {
  const defaultUser = {
    firstname: 'Mohammed',
    lastname: 'Adel',
    email: 'adel@gmail.com',
    phone: '01124597562',
    password: '5791355',
  };

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
