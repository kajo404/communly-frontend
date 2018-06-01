import React from 'react';
import AnnouncementComponent from './announcement';
import AnnouncementsService from '../../services/announcements-service';
import NewAnnouncementModal from './new-announcement-modal';
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
  width: '98%'
};

class Announcements extends React.Component {
  announcementsSubscription;
  state = {
    modalOpen: false,
    adminAnnouncements: [],
    normalAnnouncements: [],
    selectedValue: 0
  };

  constructor(props) {
    super(props);
    this.updateAnnouncements();

    this.savedNewAnnouncement = this.savedNewAnnouncement.bind(this);
  }

  updateAnnouncements() {
    AnnouncementsService.getAnnouncements()
      .then(data => this.filterAnnouncements(data.announcements))
      .catch(error => console.error(error));
  }

  savedNewAnnouncement() {
    this.updateAnnouncements();
  }

  filterAnnouncements(announcements) {
    const adminAnnouncementsFiltered = announcements.filter(function(
      announcement
    ) {
      return announcement.author.roles.includes('admin');
    });

    const normalAnnouncementsFiltered = announcements.filter(function(
      announcement
    ) {
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

  render() {
    if (
      this.state.adminAnnouncements.length > 0 &&
      this.state.normalAnnouncements.length > 0 &&
      this.state.selectedValue === 0
    ) {
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
            <h1>Admin Posts</h1>
            <br />
            <div className="p-announcements-content">
              {this.state.adminAnnouncements.map((announcement, index) => (
                <AnnouncementComponent
                  announcement={announcement}
                  key={index}
                />
              ))}
            </div>
          </div>
          <Divider style={dividerStyles} />
          <div className="p-announcements-lower-container">
            <h1>Resident Posts</h1>
            <br />
            <div className="p-announcements-content">
              {this.state.normalAnnouncements.map((announcement, index) => (
                <AnnouncementComponent
                  announcement={announcement}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="p-announcements-add-button">
            <NewAnnouncementModal
              savedNewAnnouncement={this.savedNewAnnouncement}
            />
          </div>
        </div>
      );
    } else if (
      this.state.adminAnnouncements.length > 1 &&
      this.state.selectedValue === 1
    ) {
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
            <h1>Admin Posts</h1>
            <br />
            <div className="p-announcements-content">
              {this.state.adminAnnouncements.map((announcement, index) => (
                <AnnouncementComponent
                  announcement={announcement}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="p-announcements-add-button">
            <NewAnnouncementModal
              savedNewAnnouncement={this.savedNewAnnouncement}
            />
          </div>
        </div>
      );
    } else {
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
            <h1>Resident Posts</h1>
            <br />
            <div className="p-announcements-content">
              {this.state.normalAnnouncements.map((announcement, index) => (
                <AnnouncementComponent
                  announcement={announcement}
                  key={index}
                />
              ))}
            </div>
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
}

export default Announcements;
