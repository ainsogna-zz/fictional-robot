import React from 'react';
// import Switch from 'react-toggle-switch';
import Tabletop from 'tabletop';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      percent: 50,
      switched: false,
      requireApplePay: false,
      orderAhead: false,
      data: []
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  toggleSwitch = () => {
    this.setState(prevState => {
      return {
        switched: !prevState.switched
      };
    });
  };

  handleClick() {
    const data = this.state.data;

    var results = [];
    for (var row of data) {
      console.log(row["Apple Pay?"]);
      const b1 = !this.state.requireApplePay || (this.state.requireApplePay && row['Apple Pay?'] === '👍');
      const b2 = !this.state.orderAhead || (this.state.orderAhead && row['Order Ahead?'] === '👍');

      if (b1 && b2) {
        results.push(row);
      }
    }

    console.log(results);

    const index = Math.floor(Math.random() * results.length);
    const resultRow = results[index];
    const prompt = resultRow.Name + " at " + resultRow.Location + "\n\nReviews:\n" + resultRow.Reviews;
    window.alert(prompt);
  }

  componentDidMount() {
    Tabletop.init({
      // orig: 14vqSXVmuBh58UCQg7ar_SeHd2zehWLz2mCt8thaWKGw
      // copy: 1-kaR3hI338g-9v5ona8guM-Q79KVXO3OBEq7xKT_miU
      key: '14vqSXVmuBh58UCQg7ar_SeHd2zehWLz2mCt8thaWKGw',
      callback: googleData => {
        console.log(googleData);
        this.setState({ data: googleData });
      },
      simpleSheet: true
    })
  }

  onChange = (percent) => {
    this.setState({ percent });
  }

  onDone = (percent) => {
    this.setState({ percent });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    this.setState({
      [name]: value
    });
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

        <button className="App-button" onClick={this.handleClick}>
          ☕
        </button>
      </div>
    );
  }
}

export default App;
