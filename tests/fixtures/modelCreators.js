const jwt = require('jsonwebtoken');
const faker = require('faker');

const Role = require('../../middlewares/role');
const { phones } = require('./products');

const createUser = (id, role) => {
  return {
    _id: id,
    role,
    firstname: faker.name.firstName(),
    lastname: faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber('01#########'),
    password: faker.internet.password(10),
    tokens: [
      {
        token: jwt.sign({ id, role }, process.env.SECRET_KEY),
      },
    ],
  };
};

const createProduct = (id, storeId) => {
  return {
    _id: id,
    amount: faker.random.number({ min: 800, max: 1000 }),
    booked: faker.random.number({ min: 100, max: 800 }),
    category: 'Mobile Phone',
    color: faker.commerce.color(),
    description: faker.lorem.slug(10),
    discount: faker.random.number({ min: 0, max: 50 }),
    ...faker.random.arrayElement(phones),
    price: 1000,
    rating: 0,
    store: storeId,
  };
};

const createStore = id => {
  return {
    _id: id,
    name: faker.company.companyName(),
    username: faker.name.firstName(),
    phone: faker.phone.phoneNumber('01#########'),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    role: Role.Store,
    tokens: [
      {
        token: jwt.sign({ id: id, role: Role.Store }, process.env.SECRET_KEY),
      },
    ],
  };
};

module.exports = {
  createProduct,
  createStore,
  createUser,
};
