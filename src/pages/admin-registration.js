import UserService from '../services/user-service';
import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

class AdminRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      dateOfBirth: null,
      password: '',
      code: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onBirthDateChange = this.onBirthDateChange.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);

    this.buttonStyles = {
      position: 'relative',
      marginTop: '30px'
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

  register(user) {
    UserService.registerAdmin(
      user.firstname,
      user.lastname,
      user.email,
      user.password,
      user.dateOfBirth.toISOString(),
      this.state.code
    )
      .then(result => {
        this.props.history.push('/announcements');
      })
      .catch(e => {
        this.setState({
          error: e
        });
        this.onRegistrationError();
      });
    //TODO: Set error string (e) according to chached error
  }

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

  onCodeChange(event) {
    this.setState({ code: event.target.value.trim() });
    if (event.target.value.trim() === '') {
      this.setState({ displayError: 'none' });
    }
  }

  get isButtonDisabled() {
    return (
      this.state.username === '' ||
      this.state.firstname === '' ||
      this.state.lastname === '' ||
      this.state.email === '' ||
      this.state.password === '' ||
      this.state.code === ''
    );
  }

  onRegistrationError() {
    this.setState({
      displayError: 'display'
    });
  }

  render() {
    return (
      <div className="p-user-login__content">
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
        <TextField
          type="password"
          floatingLabelText="Registration Code"
          required={true}
          value={this.state.code}
          onChange={this.onCodeChange}
        />
        <RaisedButton
          label="REGISTER"
          labelStyle={this.buttonStyles}
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
      </div>
    );
  }
}

export default withRouter(AdminRegistration);
