const express = require('express');
const database = require('../database/index.js');
// const router = require('./router.js');
const path = require('path');
const CORS = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
// app.use(express.Router());
app.use(morgan('dev'));

app.use(CORS());
//app.use('/api'/*, router*/);
console.log('path join: ' + path.join(__dirname, '..', 'public'));
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/location', (req, res) => {
  var getApartments = function(city, state) {
    axios.get(`https://www.apartments.com/${city} ${state}`)
      .then(function(response) {
        var html = response.data;
        var $ = cheerio.load(html);
        var apartmentLinks = [];
        $('.property-link').each( (index, value) => {
          var apartmentLink = $(value).attr('href');
          if(!apartmentLinks.includes(apartmentLink)) {
            apartmentLinks.push(apartmentLink);
          }
        });
        res.send(apartmentLinks);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  getApartments(req.query.city, req.query.state);
})

app.get('/apartment', (req, res) => {
  var getApartment = function(url) {
    axios.get(url)
      .then(function(response) {
        var html = response.data;
        var $ = cheerio.load(html);
        var details = $('.priceBedRangeInfoInnerContainer').text();
        var rating = $('.reviewRating').text();
        var ratingCount = $('.reviewCount').text();
        var address = $('.propertyAddressContainer').text();
        if (details) {
          details = details.split('\n');
          ratingCount = ratingCount.split(' ')[0].substring(1);
          address = address.split('\n');
          var result = {
            monthlyRent: details[2].trim(),
            bedrooms: details[5].trim(),
            bathrooms: details[8].trim(),
            squareFootage: details[11].trim(),
            rating: rating,
            ratingCount: ratingCount,
            address: `${address[2].trim()} ${address[3].trim()} ${address[4].trim()} ${address[5].trim()}`
          }
          res.send(result);
        } else {
          console.log('trying again');
          getApartment(url);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  console.log('url: ', req.query.url);
  getApartment(req.query.url);
  // database.readAllProducts((results) => {
  //   res.send(results);
  // });
})

app.post('/apartmentView', (req, res) => {
  console.log('req.query: ', req.query);
  database.addApartmentView(req.query.url, req.query.time);
  res.send(req.query.time);
})

module.exports = app;