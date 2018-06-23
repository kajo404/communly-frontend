import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import VotingComponent from './voting';
import UserService from '../../services/user-service';

class AnnouncementComponent extends Component {
  date;
  state = {
    user: undefined
  };

  constructor(props) {
    super(props);

    this.date = new Date(this.props.announcement.creationDate);
    this.getCurrentUser();
  }

  getCurrentUser = () => {
    UserService.getFullUser()
      .then(user => this.setState({ user: user }))
      .catch(error => console.log(error));
  };

  updateAnnouncements = () => {
    this.props.updateAnnouncements();
  };

  openDeleteConfirmationModal = () => {
    this.props.deleteAnnouncement(this.props.announcement._id);
  };

  get deleteIconClasses() {
    return this.state.user !== undefined &&
      (this.state.user._id == this.props.announcement.author._id ||
        this.state.user.roles.includes('admin'))
      ? 'c-announcements__close-icon material-icons'
      : 'c-announcements__close-icon material-icons disabled';
  }

  render() {
    return (
      <Paper className="c-announcement-paper" zDepth={1}>
        <i
          className={this.deleteIconClasses}
          onClick={this.openDeleteConfirmationModal}
        >
          close
        </i>
        <div className="c-announcement-content c-announcements-title">
          <h3>{this.props.announcement.title}</h3>
        </div>
        <hr />
        <div className="c-announcement-content">
          <div className="c-announcements-text-content">
            {this.props.announcement.content}
          </div>
          {this.props.announcement.isVotable ? (
            <div className="c-announcements-voting-content">
              <VotingComponent
                announcement={this.props.announcement}
                updateAnnouncements={this.updateAnnouncements}
              />
            </div>
          ) : null}
        </div>
        <div className="c-announcement-author">
          {this.props.announcement.author.firstname}{' '}
          {this.props.announcement.author.lastname},{' '}
          {this.date.toLocaleDateString()}
        </div>
      </Paper>
    );
  }
}

export default AnnouncementComponent;
