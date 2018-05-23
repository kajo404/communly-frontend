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
  }

  updateAnnouncements() {
    AnnouncementsService.getAnnouncements()
      .then(data => this.setState({ announcements: data.announcements }))
      .catch(error => console.error(error));
  }

  savedNewAnnouncement(announcement) {
    this.updateAnnouncements();
  }

  render() {
    return (
      <div>
        <div className="p-task-boards">
          {this.state.announcements.map((announcement, index) => (
            <AnnouncementComponent announcement={announcement} key={index} />
          ))}
        </div>
        <div className="p-announcements-footer">
          <NewAnnouncementModal
            savedNewAnnouncement={this.savedNewAnnouncement}
          />
        </div>
      </div>
    );
  }
}

export default Announcements;
