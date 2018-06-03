import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import NewUploadModal from './upload-img-modal';
import RaisedButton from 'material-ui/RaisedButton';

//Services
import UserService from '../../services/user-service';
import AnnouncementService from '../../services/announcements-service';
import TaskService from '../../services/task-service';
import TaskBoardService from '../../services/task-board-service';

class UserDetailComponent extends Component {
  date;

  constructor(props) {
    super(props);

    var user = UserService.getCurrentUser();
    this.state = {
      userId: user.id,
      name: user.name
    };

    this.getProfile();
  }

  getProfile() {
    UserService.getFullUser()
      .then(result => {
        this.setState({
          email: result.email,
          dateOfBirth: result.dateOfBirth,
          role: result.roles[0],
          image: result.image
        });
      })
      .catch(e => {
        this.setState({ error: 'Username or password is wrong!' });
        this.setState({ error: e });
      });

    AnnouncementService.getAnnoncementsForUser()
      .then(result => {
        var numberAnnouncements = Object.keys(result.announcements).length;
        this.setState({ numberAnnouncements: numberAnnouncements });
      })
      .catch(e => {
        this.setState({ error: 'No Announcements for user!' });
        this.setState({ error: e });
      });

    TaskBoardService.getTasklistsForUserAsAuthor()
      .then(result => {
        var numberTasklistsAuthor = Object.keys(result.tasklists).length;
        this.setState({ numberTasklistsAuthor: numberTasklistsAuthor });
      })
      .catch(e => {
        this.setState({ error: 'No Tasklists for user as author!' });
        this.setState({ error: e });
      });

    TaskBoardService.getTasklistsForUserAsMemeber()
      .then(result => {
        var numberTasklistsMember = Object.keys(result.tasklists).length;
        this.setState({ numberTasklistsMember: numberTasklistsMember });
      })
      .catch(e => {
        this.setState({ error: 'No Tasklists for user as memeber!' });
        this.setState({ error: e });
      });

    TaskService.getAllAsignedTasksForUser()
      .then(result => {
        var numberAssignedTasks = Object.keys(result.tasks).length;
        this.setState({ numberAssignedTasks: numberAssignedTasks });
      })
      .catch(e => {
        this.setState({ error: 'No assigned Tasks for user!' });
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
      <Paper className="c-userDetails-paper" zDepth={1}>
        <img className="c-profile-img" src={this.state.image} alt="Profile" />
        <div className="c-userDetails-content">
          <h2>Profile</h2>
          <table className="c-userDetails-content-table">
            <tbody>
              <tr>
                <td>Name: </td>
                <td>{this.state.name}</td>
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
        <div className="p-profile-uploadButton">
          <NewUploadModal />
        </div>
        <RaisedButton
          label="Edit"
          primary={true}
          className="p-profile-editButton"
        />
      </Paper>
    );
  }
}

export default UserDetailComponent;