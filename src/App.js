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
import UserRegistration from './pages/user-registration';
import Announcements from './pages/announcements';

import UserService from './services/user-service';

// This replaces the text color value on the palette
// and then update the keys for each component that depends on it.
const muiTheme = getMuiTheme({
  palette: {
    textColor: '#314f81',
    primary1Color: '#314f81',
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
          path: '/login',
          exact: true
        },
        {
          component: Announcements,
          path: '/announcements'
        },
        {
          component: UserRegistration,
          path: '/registration'
        },
        {
          render: props => {
            if (UserService.isAuthenticated()) {
              console.log('route', props);
              return <TaskBoardPage />;
            } else {
              return <Redirect to={'/login'} />;
            }
          },
          path: '/task-boards'
        }
      ]
    };
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router>
          <PageLayout>
            <Switch>
              {this.state.routes.map((route, i) => (
                <Route key={i} {...route} />
              ))}
            </Switch>
          </PageLayout>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
