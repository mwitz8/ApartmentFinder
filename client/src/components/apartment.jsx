const React = require('react');
const axios = require('axios');

class Apartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/apartment', { params: { url: this.props.url } })
      .then((result) => {
        console.log(result.data);
        this.setState(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    if (this.state.address) {
      return(
        <div>
          <h1>{this.state.address}</h1>
          <p>{this.state.monthlyRent}</p>
          <p>{this.state.bedrooms}</p>
          <p>{this.state.bathrooms}</p>
          <p>{this.state.squareFootage}</p>
          <p>{this.state.rating}</p>
          <p>{this.state.ratingCount} ratings</p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Apartment;
