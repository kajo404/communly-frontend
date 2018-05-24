import React from 'react';
import { Link } from 'react-router-dom';

import './page-layout.scss';

import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
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

class PageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUser: true
    };
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
                leftAvatar={<Avatar src={avatar} size={30} />}
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
            <Link to="/announcements">
              <MenuItem> Announcements </MenuItem>{' '}
            </Link>
            <Link to="/task-boards">
              <MenuItem> Task Boards </MenuItem>{' '}
            </Link>
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

export default PageLayout;
