import React from 'react';
import './announcements.scss';
import AnnouncementComponent from './announcement';
import AnnouncementsService from '../../services/announcements-service';
import NewAnnouncementModal from './new-announcement-modal';
import DeleteAnnouncementModal from './delete-announcement-modal';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 300
  }
};

const dividerStyles = {
  backgroundColor: '#314f81',
  height: 2,
  width: '100%',
  margin: 30
};

class Announcements extends React.Component {
  announcementsSubscription;
  state = {
    modalOpen: false,
    deleteAnnouncementOpen: false,
    currentAnnouncement: '',
    adminAnnouncements: [],
    normalAnnouncements: [],
    selectedValue: 0
  };

  constructor(props) {
    super(props);
    this.updateAnnouncements();
  }

  // Getters

  get shouldShowAllAnnouncements() {
    return (
      this.state.selectedValue === 0 &&
      this.state.adminAnnouncements.length > 0 &&
      this.state.normalAnnouncements.length > 0
    );
  }

  get shouldShowAdminAnnouncements() {
    return (
      (this.state.selectedValue === 0 || this.state.selectedValue === 1) &&
      this.state.adminAnnouncements.length > 0
    );
  }

  get shouldShowResidentAnnouncements() {
    return (
      (this.state.selectedValue === 0 || this.state.selectedValue === 2) &&
      this.state.normalAnnouncements.length > 0
    );
  }

  get shouldShowPlaceholder() {
    return (
      this.state.normalAnnouncements.length <= 0 &&
      this.state.adminAnnouncements.length <= 0
    );
  }

  // Functionality
  updateAnnouncements = () => {
    AnnouncementsService.getAnnouncements()
      .then(data => this.filterAnnouncements(data.announcements))
      .catch(error => console.error(error));
  };

  filterAnnouncements(announcements) {
    const adminAnnouncementsFiltered = announcements.filter(announcement => {
      return announcement.author.roles.includes('admin');
    });

    const normalAnnouncementsFiltered = announcements.filter(announcement => {
      return !announcement.author.roles.includes('admin');
    });

    this.setState({
      adminAnnouncements: adminAnnouncementsFiltered,
      normalAnnouncements: normalAnnouncementsFiltered
    });
  }

  handleChange = (event, index, value) => {
    this.setState({ selectedValue: value });
  };

  handleDeleteAnnouncementClose = () => {
    this.setState({ deleteAnnouncementOpen: false });
  };

  openDeleteAnnouncementModal = callingAnnouncement => {
    this.setState({
      deleteAnnouncementOpen: true,
      currentAnnouncement: callingAnnouncement
    });
  };

  deleteAnnouncement = () => {
    AnnouncementsService.deleteAnnouncement(this.state.currentAnnouncement)
      .then(() => {
        this.updateAnnouncements();
      })
      .catch(error => console.error(error));

    this.handleDeleteAnnouncementClose();
  };

  render() {
    return (
      <div>
        <div className="p-announcements-dropdown">
          <DropDownMenu
            value={this.state.selectedValue}
            onChange={this.handleChange}
            style={styles}
          >
            <MenuItem value={0} primaryText="All Posts" />
            <MenuItem value={1} primaryText="Only Admin Posts" />
            <MenuItem value={2} primaryText="Only Resident Posts" />
          </DropDownMenu>
        </div>
        <div className="p-announcements-container">
          {this.shouldShowAdminAnnouncements ? (
            <div>
              <h1>Admin Posts</h1>
              <br />
              <div className="p-announcements-content">
                {this.state.adminAnnouncements.map((announcement, index) => (
                  <AnnouncementComponent
                    announcement={announcement}
                    updateAnnouncements={this.updateAnnouncements}
                    deleteAnnouncement={this.openDeleteAnnouncementModal}
                    key={index}
                  />
                ))}
              </div>
            </div>
          ) : null}
          {this.shouldShowAllAnnouncements ? (
            <Divider style={dividerStyles} />
          ) : null}
          {this.shouldShowResidentAnnouncements ? (
            <div>
              <h1>Resident Posts</h1>
              <br />
              <div className="p-announcements-content">
                {this.state.normalAnnouncements.map((announcement, index) => (
                  <AnnouncementComponent
                    announcement={announcement}
                    updateAnnouncements={this.updateAnnouncements}
                    deleteAnnouncement={this.openDeleteAnnouncementModal}
                    key={index}
                  />
                ))}
              </div>
            </div>
          ) : null}
          {this.shouldShowPlaceholder ? (
            <div className="p-announcements-placeholder">
              No announcements available. <br />
              Enjoy your day! <span>🎉</span>
            </div>
          ) : null}
        </div>
        <div className="p-announcements-add-button">
          <NewAnnouncementModal
            updateAnnouncements={this.updateAnnouncements}
          />
        </div>
        <DeleteAnnouncementModal
          open={this.state.deleteAnnouncementOpen}
          close={this.handleDeleteAnnouncementClose}
          deleteAnnouncement={this.deleteAnnouncement}
        />
      </div>
    );
  }
}

export default Announcements;
