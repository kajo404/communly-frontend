import React, { Component } from 'react';
import logo from './assets/logo.png';
import './App.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TaskBoardPage from './pages/task-boards-page';
import UserLogin from './pages/user-login';

// This replaces the text color value on the palette
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
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="c-main-wrapper">
          <img className="c-logo" alt="communly-logo" src={logo} />
          <UserLogin />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
