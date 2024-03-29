import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import './page-layout.scss';

import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';

import logo from './../assets/logo.png';
import UserService from '../services/user-service';

const style = {
  color: 'white',
  fontWeight: '300',
  lineheigth: '35px'
};

const appBarStyle = {
  position: 'fixed'
};

const selectedStyles = {
  backgroundColor: '#eff2f9',
  color: '#314f81',
  borderLeft: '3px solid #9ab1d9'
};

const logoutButtonStyle = {
  marginTop: '10px',
  width: '220px'
};

const memberListItemStyles = {
  margin: 0,
  padding: 0
};

const nestedListStyle = {
  height: 'calc(100vh - 320px)',
  overflowY: 'auto'
};
class PageLayout extends React.Component {
  _mounted = false;
  constructor(props) {
    super(props);
    this.state = {
      showUser: true,
      retrievedUser: false,
      activePage: 0,
      users: []
    };
    this.updateUser();
    this.getAllUsers();
  }

  componentDidMount = () => {
    this._mounted = true;
    UserService.registerListener('userDataChanged', this.updateUser.bind(this));
    UserService.registerListener(
      'userPictureChanged',
      this.updateUser.bind(this)
    );
    UserService.registerListener(
      'userAuthenticated',
      this.updateUser.bind(this)
    );
    UserService.registerListener(
      'userDataChanged',
      this.getAllUsers.bind(this)
    );
    UserService.registerListener(
      'userPictureChanged',
      this.getAllUsers.bind(this)
    );
    UserService.registerListener(
      'userAuthenticated',
      this.getAllUsers.bind(this)
    );
  };

  componentWillUnmount() {
    this._mounted = false;
  }

  getAllUsers() {
    if (UserService.isAuthenticated()) {
      UserService.getAllUsers().then(result => {
        if (this._mounted) {
          this.setState({
            users: result.users
          });
        }
      });
    }
  }

  updateUser() {
    if (UserService.isAuthenticated()) {
      UserService.getFullUser()
        .then(result => {
          this.setState({
            firstname: result.firstname,
            lastname: result.lastname,
            image: result.image
          });
        })
        .catch(e => {
          console.error(e);
          //TODO Eric: correct this one
          this.setState({
            error: 'Username or password is wrong!'
          });
          this.setState({
            error: e
          });
        });
    }
  }

  get userName() {
    const user = UserService.getCurrentUser();
    return user.firstname + ' ' + user.lastname;
  }

  logout = () => {
    this.showHideProfile();
    UserService.logout();
  };

  showHideProfile() {
    var $slider = document.getElementById('profileMenuSlider');
    var isOpen = $slider.classList.contains('c-profile-bar-slide-in');

    if (isOpen) {
      $slider.classList.remove('c-profile-bar-slide-in');
      $slider.classList.add('c-profile-bar-slide-out');
    } else {
      $slider.classList.remove('c-profile-bar-slide-out');
      $slider.classList.add('c-profile-bar-slide-in');
    }
  }

  toggleMobileMenu() {
    var navToggler = document.querySelector('.c-header__nav-toggler');
    var navEl = document.querySelector('.c-mobile-menu');
    navToggler.classList.toggle('is-open');
    navEl.classList.toggle('is-open');
  }

  changeActivePage = (event, menuItem, index) => {
    this.setState({ activePage: index });
    // this can be done more elegantly
    const newRoute = index === 0 ? '/announcements' : '/task-boards';
    this.props.history.push(newRoute);
  };

  render() {
    if (UserService.isAuthenticated()) {
      return (
        <div className="c-layout">
          <AppBar
            className="c-app-bar"
            iconElementRight={
              <ListItem
                onClick={this.showHideProfile}
                className="c-app-bar__user-info"
                style={style}
                leftAvatar={
                  <Avatar
                    src={this.state.image}
                    size={35}
                    className="c-app-bar-avatarImg"
                  />
                }
              >
                {this.state.firstname + ' ' + this.state.lastname}
              </ListItem>
            }
            iconElementLeft={
              <div>
                <img className="c-logo" src={logo} alt="communly logo" />
                <div
                  className="c-header__nav-toggler"
                  onClick={this.toggleMobileMenu}
                >
                  <div className="c-header__nav-toggler-line" />
                  <div className="c-header__nav-toggler-line" />
                  <div className="c-header__nav-toggler-line" />
                </div>
                <div className="c-mobile-menu">
                  <Link to="/profile" onClick={this.toggleMobileMenu}>
                    <MenuItem className="c-menu-item"> Profile </MenuItem>{' '}
                  </Link>
                  <Link to="/announcements" onClick={this.toggleMobileMenu}>
                    <MenuItem
                      className="c-menu-item"
                      primaryText="Announcements"
                    />
                  </Link>
                  <Link to="/task-boards" onClick={this.toggleMobileMenu}>
                    <MenuItem
                      className="c-menu-item"
                      primaryText="Task Boards"
                    />
                  </Link>
                  <RaisedButton
                    labelColor="white"
                    style={logoutButtonStyle}
                    primary={true}
                    onClick={this.logout}
                    label="LOGOUT"
                  />
                </div>
              </div>
            }
            style={appBarStyle}
          />
          <div className="c-side-bar">
            <h2 className="c-side-bar__text">Wohnheim Communly</h2>
            <Menu
              selectedMenuItemStyle={selectedStyles}
              onItemClick={this.changeActivePage}
              value={this.state.activePage}
            >
              <MenuItem
                className="c-menu-item"
                primaryText="Announcements"
                value={0}
              />
              <MenuItem
                className="c-menu-item"
                primaryText="Task Boards"
                value={1}
              />
            </Menu>
            <Divider inset={true} />
            <List>
              <ListItem
                primaryText="Members"
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                nestedListStyle={nestedListStyle}
                nestedItems={this.state.users.map((user, key) => (
                  <ListItem
                    innerDivStyle={memberListItemStyles}
                    key={key}
                    disabled={true}
                  >
                    <div className="c-memberlist__item">
                      <Avatar
                        style={{ marginRight: '16px' }}
                        size={32}
                        src={user.image}
                      />
                      <div className="c-memberlist__username">
                        {user.firstname + ' ' + user.lastname}
                      </div>
                    </div>
                  </ListItem>
                ))}
              />
            </List>
          </div>
          <div className="c-profile-bar" id="profileMenuSlider">
            <Link to="/profile" onClick={this.showHideProfile}>
              <MenuItem> Profile </MenuItem>{' '}
            </Link>
            <MenuItem onClick={this.logout}> Logout </MenuItem>{' '}
          </div>
          <div className="c-layout__content">{this.props.children}</div>
        </div>
      );
    } else if (window.location.pathname === '/home') {
      return <div className="c-layout">{this.props.children}</div>;
    } else {
      return (
        <div className="c-layout">
          <AppBar
            className="c-app-bar"
            iconElementLeft={
              <img className="c-logo" src={logo} alt="communly logo" />
            }
          />
          <div className="c-layout__content c-layout--login-register">
            {this.props.children}
          </div>
        </div>
      );
    }
  }
}

export default withRouter(PageLayout);
