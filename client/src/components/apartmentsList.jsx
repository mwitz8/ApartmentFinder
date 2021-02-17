const React = require('react');
const axios = require('axios');
import Apartment from './apartment.jsx';

var ApartmentsList = (props) => {
  if (props.apartments && props.apartments[0]) {
    var apartments = props.apartments.map((apartmentLink) => {
      return(<Apartment url={apartmentLink} />);
    })
    return(
      apartments
    );
  } else {
    return null;
  }
}

export default ApartmentsList;