const React = require('react');
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return(
      <form>
        <div>
          <label for="name">Location: </label>
          <input type="text"></input>
        </div>
        <div>
          <input type="submit" value="Search"></input>
        </div>
      </form>
    );
  }
}

export default App;
