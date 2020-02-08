import React from 'react';
import Slider from 'react-slider-simple';
import Switch from 'react-toggle-switch';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      percent: 50,
      switched: false
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
    fetch("https://5tmuubkncf.execute-api.us-west-2.amazonaws.com/test/pets?foo=17")
      .then(res => res.json())
      .then(
        (result) => {
          window.alert(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )
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
