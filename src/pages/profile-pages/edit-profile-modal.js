import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import UserService from '../../services/user-service';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import UserDetailComponent from './userDetails';

const customModalStyle = {
  width: '500px'
};

export default class NewEditModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      name: '',
      email: '',
      dateOfBirth: null,
      newPassword: ''
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submit = this.submit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onBirthDateChange = this.onBirthDateChange.bind(this);
  }

  getProfileData() {
    UserService.getFullUser()
      .then(result => {
        this.setState({
          name: result.name,
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
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  submit = () => {
    // UserService.changeUserPicture(this.state.preview)
    //   .then(result => {
    //     window.location = 'profile';
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     this.setState({ error: e });
    //   });
  };

  onNameChange(event) {
    this.setState({ name: event.target.value.trim() });
    if (event.target.value.trim() === '') {
      this.setState({ displayError: 'none' });
    }
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value.trim() });
    if (event.target.value.trim() === '') {
      this.setState({ displayError: 'none' });
    }
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value.trim() });
    if (event.target.value.trim() === '') {
      this.setState({ displayError: 'none' });
    }
  }

  onBirthDateChange(event, date) {
    this.setState({ dateOfBirth: date });
    if (date === '') {
      this.setState({ displayError: 'none' });
    }
  }

  get isButtonDisabled() {
    return (
      this.state.username === '' ||
      this.state.name === '' ||
      this.state.email === '' ||
      this.state.password === ''
    );
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <RaisedButton
        label="Change"
        primary={true}
        onClick={this.submit}
        disabled={this.isButtonDisabled}
      />
    ];

    return (
      <div>
        <RaisedButton label="Edit" primary={true} onClick={this.handleOpen} />
        <Dialog
          title="Edit Profile Details"
          actions={actions}
          modal={true}
          contentStyle={customModalStyle}
          open={this.state.open}
        >
          <TextField
            floatingLabelText="Name"
            required={true}
            value={this.state.name}
            onChange={this.onNameChange}
            // errorText={this.getNameErrorText}
          />
          <DatePicker
            value={this.state.dateOfBirth}
            onChange={this.onBirthDateChange}
            floatingLabelText="Birth Date"
            hintText="e.g 13.07.1995"
          />
          <TextField
            type="email"
            floatingLabelText="Email (Future username)"
            required={true}
            value={this.state.email}
            onChange={this.onEmailChange}
            // errorText={this.getEmailErrorText}
          />
          <TextField
            type="password"
            floatingLabelText="Password"
            required={true}
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
        </Dialog>
      </div>
    );
  }
}
