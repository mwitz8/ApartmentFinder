require('@babel/polyfill');
const request = require('supertest');
const express = require('express');
const app = express();

app.use('/api', require('./router.js'));

jest.mock('../database/accessors.js');
const database = require('../database/accessors.js');

test('server request for products accesses the database correctly', async (done) => {
  database.readAllProducts.mockImplementation((callback) => {callback('products');});
  request(app).get("/api/products").then(response => {
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('products');
    console.log('in the response callback');
    done();
  })
  .catch((err) => {
    console.log(err);
  })
});