import React, { Component } from 'react';
import './App.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import TaskBoardPage from './pages/task-boards-page';
import UserLogin from './pages/user-login';
import PageLayout from './components/page-layout';

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
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {
          component: UserLogin,
          path: '/',
          exact: true
        },
        {
          component: TaskBoardPage,
          path: '/task-boards'
        }
      ]
    };
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <PageLayout>
          <Router>
            <Switch>
              {this.state.routes.map((route, i) => (
                <Route key={i} {...route} />
              ))}
            </Switch>
          </Router>
        </PageLayout>
      </MuiThemeProvider>
    );
  }
}

export default App;
