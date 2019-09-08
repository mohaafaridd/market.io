const request = require('supertest');
const app = require('../app');

const Product = require('../models/product.model');

const { setupDatabase, adminOne, adminOneId } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should edit product as an administrator', async () => {});
