import React from 'react';
import Switch from 'react-toggle-switch';
import Tabletop from 'tabletop';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      percent: 50,
      switched: false,
      data: []
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
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
    const index = Math.floor(Math.random() * data.length);
    const row = data[index];
    const prompt = row.Name + " at " + row.Location + "\n\nReviews:\n" + row.Reviews;
    window.alert(prompt);
  }

  componentDidMount() {
    Tabletop.init({
      // orig: 14vqSXVmuBh58UCQg7ar_SeHd2zehWLz2mCt8thaWKGw
      // copy: 1-kaR3hI338g-9v5ona8guM-Q79KVXO3OBEq7xKT_miU
      key: '14vqSXVmuBh58UCQg7ar_SeHd2zehWLz2mCt8thaWKGw',
      callback: googleData => {
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          ¯\_(ツ)_/¯
        </header>
        
        <div>
          <span>Oat milk?</span>
          <span>
            <Switch
              onClick={this.toggleSwitch}
              on={this.state.switched}
            />
          </span>
        </div>
        {/* <Slider
            value={this.state.percent}
            onChange={this.onChange}
            onDone={this.onDone}
          /> */}
        <button className="App-button" onClick={this.handleClick}>
          Go!
        </button>
      </div>
    );
  }
}

export default App;
