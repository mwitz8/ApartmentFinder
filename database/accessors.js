const mongoose = require('mongoose');

const apartmentSchema =  new mongoose.Schema({
  url: String,
  time: String
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

var addApartmentView = function(url, time) {
  var apartment = new Apartment({
    url: url,
    time: time
  });
  apartment.save((err, apartment) => {
    if (err) {
      return console.error(err);
    }
  });
}

module.exports = {
  addApartmentView
}