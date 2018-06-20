import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import VotingComponent from './voting';

class AnnouncementComponent extends Component {
  date;

  constructor(props) {
    super(props);

    this.date = new Date(this.props.announcement.creationDate);
  }

  updateAnnouncements = () => {
    this.props.updateAnnouncements();
  };

  render() {
    return (
      <Paper className="c-announcement-paper" zDepth={1}>
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
