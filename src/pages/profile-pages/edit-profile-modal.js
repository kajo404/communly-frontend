import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import UserService from '../../services/user-service';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import EditIcon from 'material-ui/svg-icons/image/edit';

import './profile.scss';

const customModalStyle = {
  width: '320px'
};

export default class NewEditModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.getProfileData();

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submit = this.submit.bind(this);
    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onBirthDateChange = this.onBirthDateChange.bind(this);
  }

  getProfileData() {
    UserService.getFullUser()
      .then(result => {
        this.setState({
          firstname: result.firstname,
          lastname: result.lastname,
          initialName: result.name,
          email: result.email,
          initialEmail: result.email,
          dateOfBirth: result.dateOfBirth,
          initialDateOfBirth: result.dateOfBirth,
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
    UserService.updateUserData(
      this.state.name,
      this.state.email,
      this.state.dateOfBirth
    )
      .then(this.handleClose())
      .catch(e => {
        console.error(e);
        this.setState({ error: e });
      });
  };

  onFirstNameChange(event) {
    this.setState({ firstname: event.target.value.trim() });
    if (event.target.value.trim() === '') {
      this.setState({ displayError: 'none' });
    }
  }

  onLastNameChange(event) {
    this.setState({ lastname: event.target.value.trim() });
    if (event.target.value.trim() === '') {
      this.setState({ displayError: 'none' });
    }
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value.trim()
    });
    if (event.target.value.trim() === '') {
      this.setState({ displayError: 'none' });
    }
  }

  onEmailChange(event) {
    this.setState({
      email: event.target.value.trim()
    });
    if (event.target.value.trim() === '') {
      this.setState({ displayError: 'none' });
    }
  }

  onBirthDateChange(event, date) {
    this.setState({
      dateOfBirth: date.toISOString()
    });
    if (date === '') {
      this.setState({ displayError: 'none' });
    }
  }

  dataChanged() {
    if (
      this.state.initialName !== this.state.name ||
      this.state.initialEmail !== this.state.email ||
      this.state.initialDateOfBirth !== this.state.dateOfBirth
    ) {
      return true;
    } else {
      return false;
    }
  }

  get isButtonDisabled() {
    return (
      this.state.firstname === '' ||
      this.state.lastname === '' ||
      this.state.email === '' ||
      this.state.password === '' ||
      !this.dataChanged()
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
        <RaisedButton
          label="Edit"
          primary={true}
          onClick={this.handleOpen}
          icon={<EditIcon />}
        />
        <Dialog
          title="Edit Profile Details"
          actions={actions}
          modal={true}
          contentStyle={customModalStyle}
          open={this.state.open}
        >
          <TextField
            floatingLabelText="First Name"
            required={true}
            value={this.state.firstname}
            onChange={this.onFirstNameChange}
            // errorText={this.getNameErrorText}
          />
          <TextField
            floatingLabelText="Last Name"
            required={true}
            value={this.state.lastname}
            onChange={this.onLastNameChange}
            // errorText={this.getNameErrorText}
          />
          <DatePicker
            value={new Date(this.state.dateOfBirth)}
            onChange={this.onBirthDateChange}
            floatingLabelText="Birth Date"
            hintText="e.g 13.07.1995"
          />
          <TextField
            type="email"
            floatingLabelText="Email"
            required={true}
            value={this.state.email}
            onChange={this.onEmailChange}
            // errorText={this.getEmailErrorText}
          />
        </Dialog>
      </div>
    );
  }
}
