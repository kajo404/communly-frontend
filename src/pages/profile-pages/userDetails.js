import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import NewUploadModal from './upload-img-modal';
import NewEditModal from './edit-profile-modal';
import NewChangePwModal from './change-password-modal';
import UserService from '../../services/user-service';
import AdminService from '../../services/admin-service';

import './profile.scss';

class UserDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.getProfile();
    this.state = {
      image: ''
    };
  }

  componentDidMount = () => {
    UserService.registerListener(
      'userPictureChanged',
      this.getProfile.bind(this)
    );
    UserService.registerListener('userDataChanged', this.getProfile.bind(this));
  };

  getProfile() {
    UserService.getFullUser()
      .then(result => {
        this.setState({
          userId: result._id,
          lastname: result.lastname,
          firstname: result.firstname,
          email: result.email,
          dateOfBirth: result.dateOfBirth,
          role: result.roles[0],
          image: result.image
        });
      })
      .catch(e => {
        this.setState({ errorMessage: 'Username or password is wrong!' });
        this.setState({ error: e });
      });
  }

  formatDate(d) {
    var date = new Date(d);
    var monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  render() {
    return (
      <div className="c-userProfile-wrapper">
        <h2>Profile</h2>
        <Paper className="c-userDetails-paper" zDepth={1}>
          <div className="c-profile-img-wrapper">
            <img
              className="c-profile-img"
              src={this.state.image}
              alt="Profile"
            />
            <div className="p-profile-uploadButton">
              <NewUploadModal />
            </div>
          </div>
          <div className="c-profile-content-wrapper">
            <div className="c-userDetails-content">
              <table className="c-userDetails-content-table">
                <tbody>
                  <tr>
                    <td>Name: </td>
                    <td>{this.state.firstname + ' ' + this.state.lastname}</td>
                  </tr>
                  <tr>
                    <td>Email: </td>
                    <td>{this.state.email}</td>
                  </tr>
                  <tr>
                    <td>Birthday:</td>
                    <td>{this.formatDate(this.state.dateOfBirth)}</td>
                  </tr>
                  <tr>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>ID:</td>
                    <td>{this.state.userId}</td>
                  </tr>
                  <tr>
                    <td>Role:</td>
                    <td>{this.state.role}</td>
                  </tr>
                </tbody>
              </table>

              {/* <h3> # created Announcements: {this.state.numberAnnouncements}</h3>
                <h3> # created Tasklists: {this.state.numberTasklistsAuthor}</h3>
                <h3> # atended Tasklists: {this.state.numberTasklistsMember}</h3>
                <h3> # assigned Tasks: {this.state.numberAssignedTasks}</h3> */}
            </div>
            <br />

            <div className="p-profile-editButton">
              <NewEditModal />
            </div>
            <div className="p-profile-changePwButton">
              <NewChangePwModal />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default UserDetailComponent;
