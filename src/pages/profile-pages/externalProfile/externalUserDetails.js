import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import UserService from '../../../services/user-service';

import '../profile.scss';

class ExternalUserDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.getExternalProfile(props.externalUserId);
    this.state = {
      image: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.getExternalProfile(nextProps.externalUserId);
  }

  getExternalProfile(externalUserId) {
    UserService.getOtherUser(externalUserId)
      .then(result => {
        this.setState({
          lastname: result.lastname,
          firstname: result.firstname,
          email: result.email,
          dateOfBirth: result.dateOfBirth,
          role: result.roles[0],
          image: result.image
        });
        this.render();
      })
      .catch(e => {
        this.setState({ errorMessage: 'Other was not found User!' });
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
                    <td>Role:</td>
                    <td>{this.state.role}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
          </div>
        </Paper>
      </div>
    );
  }
}

export default ExternalUserDetailComponent;
