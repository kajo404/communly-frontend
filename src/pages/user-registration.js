import UserService from '../services/user-service';
import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

const buttonStyles = {
  position: 'relative',
  marginTop: '30px'
};

const ERROR_CODES = {
  400: 'This email is already taken!',
  'Failed to fetch': 'Hm, could not connect to the server!'
};
class UserRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      dateOfBirth: null,
      password: '',
      errorBar: {
        open: false,
        message: ''
      }
    };
  }

  onSubmit(event) {
    event.preventDefault();

    const user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      dateOfBirth: this.state.dateOfBirth,
      password: this.state.password
    };

    this.register(user);
  }

  register = user => {
    UserService.register(
      user.firstname,
      user.lastname,
      user.email,
      user.password,
      user.dateOfBirth.toISOString()
    )
      .then(result => {
        this.props.history.push('/announcements');
      })

      //TODO default fehler wenn kein fehler zutrifft
      .catch(errorCode => {
        this.setState({
          errorBar: {
            message: ERROR_CODES[errorCode],
            open: true
          }
        });
      });
  };

  onFirstNameChange = event => {
    this.setState({ firstname: event.target.value.trim() });
  };

  onLastNameChange = event => {
    this.setState({ lastname: event.target.value.trim() });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value.trim() });
  };

  onEmailChange = event => {
    this.setState({ email: event.target.value.trim() });
  };

  onBirthDateChange = (event, date) => {
    this.setState({ dateOfBirth: date });
  };

  get isButtonDisabled() {
    return (
      this.state.username === '' ||
      this.state.firstname === '' ||
      this.state.lastname === '' ||
      this.state.email === '' ||
      this.state.password === '' ||
      this.state.dateOfBirth === null
    );
  }

  closeSnackbar = () => {
    this.setState({
      errorBar: { message: '', open: false }
    });
  };

  render() {
    return (
      <div className="p-user-login__content">
        <TextField
          floatingLabelText="First Name"
          required={true}
          value={this.state.firstname}
          onChange={this.onFirstNameChange}
        />
        <TextField
          floatingLabelText="Last Name"
          required={true}
          value={this.state.lastname}
          onChange={this.onLastNameChange}
        />
        <DatePicker
          required={true}
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
        />
        <TextField
          type="password"
          floatingLabelText="Password"
          required={true}
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <RaisedButton
          label="REGISTER"
          labelStyle={buttonStyles}
          primary={true}
          className="c-login__button"
          onClick={this.onSubmit}
          disabled={this.isButtonDisabled}
        />
        <br />
        <br />
        <Link to={'/login'} className="p-reg__login-link">
          Just login?
        </Link>
        <br />
        <br />
        <div
          className="c-loginError"
          style={{ display: this.state.displayError }}
        >
          {this.state.error}
        </div>
        <Snackbar
          open={this.state.errorBar.open}
          message={this.state.errorBar.message}
          autoHideDuration={3000}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

export default withRouter(UserRegistration);
