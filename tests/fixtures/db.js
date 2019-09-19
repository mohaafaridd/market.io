const { Types } = require('mongoose');
const { createProduct, createStore, createUser } = require('./modelCreators');

const Cart = require('../../models/cart.model');
const Courier = require('../../models/courier.model');
const Order = require('../../models/order.model');
const Product = require('../../models/product.model');
const Rating = require('../../models/rating.model');
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
const productThreeId = new Types.ObjectId();
const ratingOneId = new Types.ObjectId();
const storeOneId = new Types.ObjectId();
const storeTwoId = new Types.ObjectId();
const userOneId = new Types.ObjectId();
const userTwoId = new Types.ObjectId();

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
const productThree = createProduct(productThreeId, storeTwoId);

const ratingOne = {
  _id: ratingOneId,
  product: productThreeId,
  user: userOneId,
  store: storeTwoId,
  score: 5,
  comment: 'lorem ipsum',
};

const storeOne = createStore(storeOneId);
const storeTwo = createStore(storeTwoId);

const userOne = createUser(userOneId, Role.User);
const userTwo = createUser(userTwoId, Role.User);

const setupDatabase = async () => {
  await Cart.deleteMany();
  await Courier.deleteMany();
  await Order.deleteMany();
  await Product.deleteMany();
  await Rating.deleteMany();
  await Store.deleteMany();
  await User.deleteMany();
  await new Cart(cartOne).save();
  await new Courier(courierOne).save();
  await new Order(orderOne).save();
  await new Product(productOne).save();
  await new Product(productThree).save();
  await new Rating(ratingOne).save();
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
  productThree,
  productThreeId,
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
