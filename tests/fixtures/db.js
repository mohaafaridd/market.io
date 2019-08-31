const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const Store = require('../../models/store.model');
const Product = require('../../models/product.model');
const Cart = require('../../models/cart.model');
const Role = require('../../middlewares/role');

const storeId = new mongoose.Types.ObjectId();
const storeOne = {
  _id: storeId,
  name: 'Sigma',
  username: 'sigma',
  phones: ['01012227424'],
  emails: ['sigma@gmail.com'],
  password: '123456',
  role: Role.Store,
  tokens: [
    {
      token: jwt.sign(
        { id: storeId, role: Role.Store },
        process.env.SECRET_KEY
      ),
    },
  ],
};

const productOneId = new mongoose.Types.ObjectId();
const productOne = {
  _id: productOneId,
  category: 'Mobile Phone',
  manufacturer: 'Samsung',
  name: 'Note 10',
  description: 'Cool ass phone',
  model: 'note-10',
  color: 'glue',
  amount: 100,
  discount: 0,
  store: storeId,
  booked: 0,
};

const productTwoId = new mongoose.Types.ObjectId();
const productTwo = {
  _id: productTwoId,
  category: 'Mobile Phone',
  manufacturer: 'Honor',
  name: 'Honor 8x',
  description: 'Cool ass phone',
  model: 'honor-8x',
  color: 'blue',
  amount: 100,
  discount: 0,
  store: storeId,
  booked: 0,
};

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  firstname: 'Mohammed',
  lastname: 'Farid',
  email: 'mohammed@gmail.com',
  phone: '01012227424',
  password: '123456',
  role: Role.User,
  tokens: [
    {
      token: jwt.sign(
        { id: userOneId, role: Role.User },
        process.env.SECRET_KEY
      ),
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
  role: Role.User,
  tokens: [
    {
      token: jwt.sign(
        { id: userTwoId, role: Role.User },
        process.env.SECRET_KEY
      ),
    },
  ],
};

const cartOneId = new mongoose.Types.ObjectId();
const cartOne = {
  _id: cartOneId,
  owner: userOneId,
  id: productOneId,
  amount: 1,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Store.deleteMany();
  await Product.deleteMany();
  await Cart.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Store(storeOne).save();
  await new Product(productOne).save();
  await new Cart(cartOne).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  storeId,
  storeOne,
  productOneId,
  productOne,
  productTwoId,
  productTwo,
  setupDatabase,
};
