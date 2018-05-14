import React, { Component } from 'react';
import logo from './assets/logo.png';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
const muiTheme = getMuiTheme({
  palette: {
    textColor: '#597ec0',
    primary1Color: '#9ab1d9',
    primary2Color: '#9ab1d9'
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="c-main-wrapper">
          <h1> Communly test: color scheme </h1>
          <img className="c-logo" src={logo} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
