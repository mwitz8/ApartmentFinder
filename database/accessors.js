const mongoose = require('mongoose');

const productSchema =  new mongoose.Schema({
  name: String,
  imageUrl: String,
  price: Number,
  description: String
});

const Product = mongoose.model('Product', productSchema);

var readAllProducts = function(callback) {
  Product.find(function (err, products) {
    if (err) {
      return console.error(err);
    }
    callback(products);
  })
}
var createProduct = function(name, imageUrl, price, description) {
  var product = new Product({
    name: name,
    imageUrl: imageUrl,
    price: price,
    description: description
  });
  product.save((err, product) => {
    if (err) {
      return console.error(err);
    }
  });
}
var drop = function(database, callback) {
  return database.dropDatabase(callback);
}

module.exports = {
  readAllProducts,
  createProduct,
  drop
}