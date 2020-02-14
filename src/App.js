import React from 'react';
// import Switch from 'react-toggle-switch';
import Tabletop from 'tabletop';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      requireApplePay: false,
      orderAhead: false,
      matcha: false,
      data: [],
      resultName: '',
      resultLocation: '',
      resultReviews: ''
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClick() {
    const data = this.state.data;

    var results = [];
    for (var row of data) {
      const b1 = !this.state.requireApplePay || (this.state.requireApplePay && row['Apple Pay?'] === '👍');
      const b2 = !this.state.orderAhead || (this.state.orderAhead && row['Order Ahead?'] === '👍');
      const b3 = !this.state.matcha || (this.state.matcha && row['Matcha?'] === '👍');

      if (b1 && b2 && b3) {
        results.push(row);
      }
    }

    console.log(results);

    const index = Math.floor(Math.random() * results.length);
    const resultRow = results[index];

    this.setState({ 
      resultName: resultRow.Name,
      resultLocation: resultRow.Location,
      resultReviews: resultRow.Reviews
    });
  }

  componentDidMount() {
    Tabletop.init({
      // orig: 14vqSXVmuBh58UCQg7ar_SeHd2zehWLz2mCt8thaWKGw
      // copy: 1-kaR3hI338g-9v5ona8guM-Q79KVXO3OBEq7xKT_miU
      key: '14vqSXVmuBh58UCQg7ar_SeHd2zehWLz2mCt8thaWKGw',
      callback: googleData => {
        // console.log(googleData);
        this.setState({ data: googleData });
      },
      simpleSheet: true
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  massage(str) {
    return str.substring(1, str.length - 1).replace("\n", "<br>");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          ¯\_(ツ)_/¯
        </header>
      
        <div>
          <label>
            Require Apple Pay?
            <input
              name="requireApplePay"
              type="checkbox"
              checked={this.state.requireApplePay}
              onChange={this.handleInputChange} />
          </label>
        </div>

        <div>
          <label>
            Order Ahead?
            <input
              name="orderAhead"
              type="checkbox"
              checked={this.state.orderAhead}
              onChange={this.handleInputChange} />
          </label>
        </div>

        <div>
          <label>
            Matcha?
            <input
              name="matcha"
              type="checkbox"
              checked={this.state.matcha}
              onChange={this.handleInputChange} />
          </label>
        </div>

        <button 
          className="App-button" 
          disabled={this.state.data.length == 0}
          onClick={this.handleClick}
        >
          ☕
        </button>

        <div className="App-result">
          <div>
            {this.state.resultName}
          </div>
          <div>
            {this.state.resultLocation}
          </div>
          <div>
            {this.state.resultReviews}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
