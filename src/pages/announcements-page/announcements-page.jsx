import React from 'react';
import AnnouncementComponent from './announcement';
import AnnouncementsService from '../../services/announcements-service';
import NewAnnouncementModal from './new-announcement-modal';

class Announcements extends React.Component {
  announcementsSubscription;
  state = {
    modalOpen: false,
    announcements: []
  };

  constructor(props) {
    super(props);
    this.updateAnnouncements();

    this.savedNewAnnouncement = this.savedNewAnnouncement.bind(this);
  }

  updateAnnouncements() {
    AnnouncementsService.getAnnouncements()
      .then(data => this.setState({ announcements: data.announcements }))
      .catch(error => console.error(error));
  }

  savedNewAnnouncement() {
    this.updateAnnouncements();
  }

  render() {
    return (
      <div>
        <div className="p-announcements-content">
          {this.state.announcements.map((announcement, index) => (
            <AnnouncementComponent announcement={announcement} key={index} />
          ))}
        </div>
        <div className="p-announcements-add-button">
          <NewAnnouncementModal
            savedNewAnnouncement={this.savedNewAnnouncement}
          />
        </div>
      </div>
    );
  }
}

export default Announcements;