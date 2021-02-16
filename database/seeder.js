const faker = require('faker');
const database = require('./index');

var seed = function(num) {
  database.drop(() => {
    for (let i = 0; i < num; i++) {
      let name = faker.commerce.productName();
      let imageUrl = faker.image.image();
      let price = faker.commerce.price();
      let description = faker.commerce.productDescription();
      database.createProduct(name, imageUrl, price, description);
    }
  })
}

module.exports = {
  seed
}