const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const Store = require('../../models/store.model');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  firstname: 'Mohammed',
  lastname: 'Farid',
  email: 'mohammed@gmail.com',
  phone: '01012227424',
  password: '123456',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.SECRET_KEY),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  firstname: 'Sherif',
  lastname: 'Ashraf',
  email: 'sherif@gmail.com',
  phone: '01252186752',
  password: '654321',
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.SECRET_KEY),
    },
  ],
};

const storeId = new mongoose.Types.ObjectId();
const storeOne = {
  _id: storeId,
  name: 'Sigma',
  username: 'sigma',
  phones: ['01012227424'],
  emails: ['sigma@gmail.com'],
  password: '123456',
  tokens: [
    {
      token: jwt.sign({ _id: storeId }, process.env.SECRET_KEY),
    },
  ],
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Store.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Store(storeOne).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  storeId,
  storeOne,
  setupDatabase,
};
