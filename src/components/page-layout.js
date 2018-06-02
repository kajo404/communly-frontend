import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import './page-layout.scss';

import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';

import logo from './../assets/logo.png';
import avatar from './../assets/avatar.png';
import UserService from '../services/user-service';

const style = {
  color: 'white',
  fontWeight: '300'
};

const appBarStyle = {
  position: 'fixed'
};

const selectedStyles = {
  backgroundColor: '#eff2f9',
  color: '#314f81',
  borderLeft: '3px solid #9ab1d9'
};

class PageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUser: true,
      activePage: 0
    };
    if (UserService.isAuthenticated()) {
      UserService.getFullUser()
        .then(result => {
          const dataUrl = result.image;

          this.setState({
            image: dataUrl
          });
        })
        .catch(e => {
          console.error(e);
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
    return UserService.getCurrentUser().name;
  }

  logout() {
    this.showHideProfile;
    UserService.logout();
  }

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
            onClick={this.showHideProfile}
            className="c-app-bar"
            iconElementRight={
              <ListItem
                style={style}
                disabled={true}
                leftAvatar={<Avatar src={this.state.image} size={30} />}
              >
                {this.userName}
              </ListItem>
            }
            iconElementLeft={
              <img className="c-logo" src={logo} alt="communly logo" />
            }
            style={appBarStyle}
          />
          <div className="c-side-bar">
            <Menu
              selectedMenuItemStyle={selectedStyles}
              onItemClick={this.changeActivePage}
              value={this.state.activePage}
            >
              <MenuItem primaryText="Announcements" value={0} />
              <MenuItem primaryText="Task Boards" value={1} />
            </Menu>
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
    } else {
      return (
        <div className="c-layout">
          <AppBar
            className="c-app-bar"
            iconElementRight={
              <ListItem
                style={style}
                disabled={true}
                leftAvatar={<Avatar src={avatar} size={30} />}
              >
                {this.name}
              </ListItem>
            }
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
