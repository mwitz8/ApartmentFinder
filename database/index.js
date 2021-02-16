const mongoose = require('mongoose');
const accessors = require('./accessors');

mongoose.connect('mongodb://localhost/reisimilarProducts', {useNewUrlParser: true, useUnifiedTopology: true});
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function() {
  console.log('connected to database');
});

var readAllProducts = accessors.readAllProducts;
var createProduct = accessors.createProduct;
var drop = (callback) => {accessors.drop(database, callback);};

module.exports = {
  readAllProducts,
  createProduct,
  drop
}