const request = require('supertest');
const app = require('../app');
const User = require('../models/user.model');

test('User Registration', async () => {
  const response = await request(app)
    .post('/user/register')
    .send({
      user: {
        firstname: 'Mohammed',
        lastname: 'Farid',
        email: 'Mohammed@gmail.com',
        phone: '01012227424',
        password: '123456',
      },
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  expect(response.body).toMatchObject({
    user: {
      firstname: 'Mohammed',
      lastname: 'Farid',
      email: 'mohammed@gmail.com',
      phone: '01012227424',
      password: '123456',
    },
  });
});
