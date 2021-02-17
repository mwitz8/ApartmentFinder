const mongoose = require('mongoose');
const accessors = require('./accessors');

mongoose.connect('mongodb://localhost/apartmentFinder', {useNewUrlParser: true, useUnifiedTopology: true});
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function() {
  console.log('connected to database');
});

var addApartmentView = accessors.addApartmentView;

module.exports = {
  addApartmentView,
}