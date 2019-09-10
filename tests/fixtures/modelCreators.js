const jwt = require('jsonwebtoken');
const faker = require('faker');

const Role = require('../../middlewares/role');
const { phones } = require('./products');

const createUser = (id, role) => {
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();
  const email = faker.internet.email(firstname, lastname);
  const phone = faker.phone.phoneNumber('010########');
  const password = faker.internet.password(10);

  return {
    _id: id,
    role,
    firstname,
    lastname,
    email,
    phone,
    password,
    tokens: [
      {
        token: jwt.sign({ id, role }, process.env.SECRET_KEY),
      },
    ],
  };
};

const createProduct = (id, storeId, ratings = []) => {
  return {
    _id: id,
    amount: faker.random.number({ min: 800, max: 1000 }),
    booked: faker.random.number({ min: 100, max: 800 }),
    category: 'Mobile Phone',
    color: faker.commerce.color(),
    description: faker.lorem.slug(10),
    discount: faker.random.number({ min: 0, max: 50 }),
    ...faker.random.arrayElement(phones),
    ratings,
    store: storeId,
  };
};

const createStore = id => {
  const name = faker.company.companyName(0);
  const regex = /(\s|[',.])/g;
  const username = name.toLowerCase().replace(regex, '-');
  return {
    _id: id,
    name,
    username,
    phone: faker.phone.phoneNumber('01#########'),
    email: faker.internet.email(name).toLowerCase(),
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
