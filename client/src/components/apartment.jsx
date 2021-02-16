const React = require('react');
const axios = require('axios');

class Apartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/apartment', { params: { param1: 'param1' } })
      .then((result) => {
        this.setState(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return;
}

export default Apartment;
