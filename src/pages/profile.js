import React from 'react';
import UserService from '../services/user-service';

class Profile extends React.Component {
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
        console.log(result);
        this.setState({
          email: result.email,
          dateOfBirth: result.dateOfBirth,
          role: result.roles[0]
        });
      })
      .catch(e => {
        console.error(e);
        this.setState({
          error: 'Username or password is wrong!'
        });
        this.setState({
          error: e
        });
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
      <div>
        <h3> ID: {this.state.userId}</h3>
        <h3> Email: {this.state.email}</h3>
        <h3> Name: {this.state.name}</h3>
        <h3> Birthday: {this.formatDate(this.state.dateOfBirth)}</h3>
        <h3> Role: {this.state.role}</h3>
      </div>
    );
  }
}

export default Profile;
