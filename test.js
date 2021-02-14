let axios = require('axios');
let cheerio = require('cheerio');

var getPrice = function(url) {
  axios.get(url)
    .then(function (response) {
      var html = response.data;
      var $ = cheerio.load(html);
      var price = $('.priceBedRangeInfoInnerContainer');
      var output = price.text();
      if (output) {
        output = output.split('\n');
        var result = {
          monthlyRent: output[2].trim(),
          bedrooms: output[5].trim(),
          bathrooms: output[8].trim(),
          squareFootage: output[11].trim()
        }
        console.log(result);
      } else {
        console.log('trying again');
        getPrice(url);
      }
    });
}

//getPrice('https://www.apartments.com/monte-vista-littleton-co/3s6v6ve/#availabilitySection');