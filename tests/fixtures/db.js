const { Types } = require('mongoose');
const jwt = require('jsonwebtoken');
const faker = require('faker');

const { phones } = require('./products');

const Cart = require('../../models/cart.model');
const Courier = require('../../models/courier.model');
const Order = require('../../models/order.model');
const Product = require('../../models/product.model');
const Store = require('../../models/store.model');
const User = require('../../models/user.model');
const Role = require('../../middlewares/role');

const adminOneId = new Types.ObjectId();
const cartOneId = new Types.ObjectId();
const courierOneId = new Types.ObjectId();
const courierTwoId = new Types.ObjectId();
const orderOneId = new Types.ObjectId();
const productOneId = new Types.ObjectId();
const productTwoId = new Types.ObjectId();
const storeOneId = new Types.ObjectId();
const storeTwoId = new Types.ObjectId();
const userOneId = new Types.ObjectId();
const userTwoId = new Types.ObjectId();

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

const adminOne = createUser(adminOneId, Role.Administrator);

const cartOne = {
  _id: cartOneId,
  owner: userOneId,
  product: productOneId,
  amount: 1,
};

const courierOne = createUser(courierOneId, Role.Courier);

const courierTwo = createUser(courierTwoId, Role.Courier);

const orderOne = {
  _id: orderOneId,
  delivered: false,
  owner: userOneId,
  courier: null,
  products: [{ id: productOneId, amount: 1 }],
};

const productOne = createProduct(productOneId, storeOneId);
const productTwo = createProduct(productTwoId, storeOneId);

const storeOne = createStore(storeOneId);
const storeTwo = createStore(storeTwoId);

const userOne = createUser(userOneId, Role.User);

const userTwo = createUser(userTwoId, Role.User);

const setupDatabase = async () => {
  await Cart.deleteMany();
  await Courier.deleteMany();
  await Order.deleteMany();
  await Product.deleteMany();
  await Store.deleteMany();
  await User.deleteMany();
  await new Cart(cartOne).save();
  await new Courier(courierOne).save();
  await new Order(orderOne).save();
  await new Product(productOne).save();
  await new Store(storeOne).save();
  await new User(adminOne).save();
  await new User(userOne).save();
};

module.exports = {
  adminOne,
  adminOneId,
  cartOne,
  cartOneId,
  courierOne,
  courierOneId,
  courierTwo,
  courierTwoId,
  orderOne,
  orderOneId,
  productOne,
  productOneId,
  productTwo,
  productTwoId,
  setupDatabase,
  storeOne,
  storeOneId,
  storeTwo,
  storeTwoId,
  userOne,
  userOneId,
  userTwo,
  userTwoId,
};
