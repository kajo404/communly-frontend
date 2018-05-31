import React from 'react';
import UserService from '../services/user-service';
var Buffer = require('buffer/').Buffer;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    var user = UserService.getCurrentUser();
    this.state = {
      userId: user.id,
      name: user.name,
      selectedFile: null
    };
    this.getProfile();
  }

  getProfile() {
    UserService.getFullUser()
      .then(result => {
        const buffer = result.image.data;
        const b64 = new Buffer(buffer).toString('base64');

        this.setState({
          email: result.email,
          dateOfBirth: result.dateOfBirth,
          role: result.roles[0],
          imageContentType: result.image.contentType,
          imageData: b64
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
        <br />
        <br />
        <br />
        <br />
        <img
          className="c-profile-img"
          src={
            'data:' +
            this.state.imageContentType +
            ';base64,' +
            this.state.imageData
          }
          alt="Profile"
        />
        <br />
        <br />
        <h3> ID: {this.state.userId}</h3>
        <h3> Email: {this.state.email}</h3>
        <h3> Name: {this.state.name}</h3>
        <h3> Birthday: {this.formatDate(this.state.dateOfBirth)}</h3>
        <h3> Role: {this.state.role}</h3>
        <br />
        <br />

        <h1>File Upload</h1>
        <input type="file" onChange={this.fileChangedHandler} />
        <button onClick={this.uploadHandler} type="submit">
          Upload
        </button>
      </div>
    );
  }

  fileChangedHandler = event => {
    var fr = new FileReader();
    const scope = this;

    fr.onload = function() {
      var array = new Int8Array(fr.result);
      scope.setState({ selectedFile: array });
    };

    fr.readAsArrayBuffer(event.target.files[0]);
    this.setState({ selectedFileType: event.target.files[0].type });
  };

  uploadHandler = () => {
    UserService.changeUserPicture(
      this.state.selectedFile,
      this.state.selectedFileType
    )
      .then(result => {
        this.props.history.push('/profile');
      })
      .catch(e => {
        console.error(e);
        this.setState({
          error: e
        });
      });
    //TODO: Set error string (e) according to chached error
  };
}

export default Profile;
