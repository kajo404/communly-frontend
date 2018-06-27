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

import TaskBoardPage from './pages/task-boards-page/task-boards-page';
import PageLayout from './components/page-layout';
import HomePage from './pages/home-page';
import Announcements from './pages/announcements-page/announcements-page';
import Profile from './pages/profile-pages/profile';
import ExternalProfile from './pages/profile-pages/externalProfile/externalProfile';

import UserService from './services/user-service';

// This replaces the text color value on the palette
// and then update the keys for each component that depends on it.
const muiTheme = getMuiTheme({
  palette: {
    textColor: '#314f81',
    primary1Color: '#314f81',
    primary2Color: '#9ab1d9',
    primary3Color: '#9ab1d9',
    pickerHeaderColor: '#314f81'
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {
          //If the user is authenticated set announcements as the defalut page
          render: props => {
            if (UserService.isAuthenticated()) {
              return <Redirect to={'/announcements'} />;
            } else {
              return <Redirect to={'/home'} />;
            }
          },
          path: '/',
          exact: true
        },
        {
          component: HomePage,
          path: '/home'
        },
        {
          render: props => {
            if (UserService.isAuthenticated()) {
              return <TaskBoardPage />;
            } else {
              return <Redirect to={'/home'} />;
            }
          },
          path: '/task-boards'
        },
        {
          render: props => {
            if (UserService.isAuthenticated()) {
              return <Announcements />;
            } else {
              return <Redirect to={'/home'} />;
            }
          },
          path: '/announcements'
        },
        {
          render: props => {
            if (UserService.isAuthenticated()) {
              return <Profile />;
            } else {
              return <Redirect to={'/home'} />;
            }
          },
          path: '/profile'
        },
        {
          render: props => {
            if (UserService.isAuthenticated()) {
              return (
                <ExternalProfile
                  externalUserId={props.history.location.state.externalUserId}
                />
              );
            } else {
              return <Redirect to={'/home'} />;
            }
          },
          path: '/externalProfile/'
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
