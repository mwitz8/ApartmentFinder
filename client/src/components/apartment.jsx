const React = require('react');
const axios = require('axios');

class Apartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/apartment', { params: { url: this.props.url } })
      .then((result) => {
        this.setState(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  onClickAddress() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    axios.post('http://localhost:3000/apartmentView', {}, { params: {url: this.props.url, time: dateTime}})
      .catch(function (error) {
        console.log(error);
      });
    console.log(dateTime);
  }

  render() {
    if (this.state.address) {
      return(
        <div>
          <a onClick={this.onClickAddress.bind(this)} href={this.props.url}>{this.state.address}</a>
          <p>{this.state.monthlyRent}</p>
          <p>{this.state.bedrooms}</p>
          <p>{this.state.bathrooms}</p>
          <p>{this.state.squareFootage}</p>
          <p>{this.state.rating} rating</p>
          <p>{this.state.ratingCount} ratings</p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Apartment;
