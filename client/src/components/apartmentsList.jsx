const React = require('react');
const axios = require('axios');
import Apartment from './apartment.jsx';

class ApartmentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apartments: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/location', { params: { city: this.props.city, state: this.props.state } })
      .then((result) => {
        this.setState({apartments: result.data});
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    if (this.state.apartments && this.state.apartments[0]) {
      var apartments = this.state.apartments.map((apartmentLink) => {
        return(<Apartment url={apartmentLink} />);
      })
      return(
        apartments
      );
    } else {
      return null;
    }
  }
}

export default ApartmentsList;