import UserService from '../services/user-service';
import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

class UserRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      dateOfBirth: null,
      password: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onBirthDateChange = this.onBirthDateChange.bind(this);

    this.buttonStyles = {
      position: 'relative',
      marginTop: '30px'
    };
  }

  onSubmit(event) {
    event.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      dateOfBirth: this.state.dateOfBirth,
      password: this.state.password
    };

    this.register(user);
  }

  register(user) {
    UserService.register(
      user.name,
      user.email,
      user.password,
      user.dateOfBirth.toISOString()
    )
      .then(result => {
        console.log(result);
        this.props.history.push('/announcements');
      })
      .catch(e => {
        console.error(e);
        this.setState({
          error: e
        });
        this.onRegistrationError();
      });
    //TODO: Set error string (e) according to chached error
  }

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
    console.log(date);
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

  onRegistrationError() {
    this.setState({
      displayError: 'display'
    });
  }

  render() {
    return (
      <div className="p-user-login__content">
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

export default withRouter(UserRegistration);
