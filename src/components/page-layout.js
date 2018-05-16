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

class PageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUser: true
    };
  }

  get username() {
    return UserService.getCurrentUser().username;
  }

  render() {
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
              {' '}
              {this.username}
            </ListItem>
          }
          iconElementLeft={
            <img className="c-logo" src={logo} alt="communly logo" />
          }
        />
        <div className="c-side-bar">
          <Link to="/announcements">
            {' '}
            <MenuItem> Announcements </MenuItem>{' '}
          </Link>
          <Link to="/task-boards">
            {' '}
            <MenuItem> Task Boards </MenuItem>{' '}
          </Link>
        </div>
        <div className="c-layout__content">{this.props.children}</div>
      </div>
    );
  }
}

export default PageLayout;
