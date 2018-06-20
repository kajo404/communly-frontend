import UserService from '../services/user-service';
import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { validateEmail } from '../services/email-validator';
import logo from './../assets/logo.png';

const buttonStyles = {
  position: 'relative'
};

const underlineStyle = {
  borderColor: '#314f81'
};

const floatingLabelStyle = {
  color: '#314f81'
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
      errorTextEmail: '',
      errorTextPW: '',
      errorBar: {
        open: false,
        message: ''
      }
    };
  }

  onSubmit = event => {
    event.preventDefault();

    const user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      dateOfBirth: this.state.dateOfBirth,
      password: this.state.password
    };

    this.register(user);
  };

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

      .catch(errorCode => {
        let errorText = '';
        if (typeof ERROR_CODES[errorCode] === 'undefined') {
          errorText = errorCode;
        } else {
          errorText = ERROR_CODES[errorCode];
        }
        this.setState({
          errorBar: {
            message: errorText,
            open: true
          }
        });
      });
  };

  onFirstNameChange = (event, value) => {
    this.setState({ firstname: value.trim() });
  };

  onLastNameChange = (event, value) => {
    this.setState({ lastname: value.trim() });
  };

  onPasswordChange = (event, value) => {
    this.setState({ password: value.trim() });
    if (value.length < 8) {
      this.setState({
        errorTextPW: 'Your password should be at least 8 characters!'
      });
    } else {
      this.setState({ errorTextPW: '' });
    }
  };

  onEmailChange = (event, value) => {
    this.setState({ email: value.trim() });
    const emailValid = validateEmail(value);
    if (!emailValid && value.trim() !== '') {
      this.setState({ errorTextEmail: 'Please enter a valid email address!' });
    } else {
      this.setState({ errorTextEmail: '' });
    }
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
      this.state.dateOfBirth === null ||
      this.state.errorTextEmail !== '' ||
      this.state.errorTextPW !== ''
    );
  }

  closeSnackbar = () => {
    this.setState({
      errorBar: { message: '', open: false }
    });
  };

  render() {
    return (
      <div className="p-registration__content">
        <div className="p-registration__left">
          <img
            className="c-registration__logo"
            src={logo}
            alt="communly logo"
          />
          <p className="big-size">
            This is <span className="c-lila"> communly </span>
          </p>
          <p className="big-size-margin">
            {' '}
            The best student dormitory management app{' '}
          </p>

          <p className="light">
            {' '}
            Out application is a simple and intuitive web-based tool that allows
            living communities of an arbitrary size to plan and organize their
            cohabitation by providing services such as an announcement page with
            a voting option, shared task boards and task assigining for
            responisbility management and tracking of the community activity in
            terms of competed tasks. <br />{' '}
            <span className="lila-color">Just try it out! </span>{' '}
          </p>
        </div>
        <div className="p-registration__form">
          <p className="dark-form-text">
            {' '}
            Register now - it's <span className="uppercase">free</span>!
          </p>

          <TextField
            floatingLabelText="First Name"
            required={true}
            value={this.state.firstname}
            onChange={this.onFirstNameChange}
            underlineStyle={underlineStyle}
            floatingLabelStyle={floatingLabelStyle}
          />
          <TextField
            floatingLabelText="Last Name"
            required={true}
            value={this.state.lastname}
            onChange={this.onLastNameChange}
            underlineStyle={underlineStyle}
            floatingLabelStyle={floatingLabelStyle}
          />
          <DatePicker
            required={true}
            value={this.state.dateOfBirth}
            onChange={this.onBirthDateChange}
            floatingLabelText="Birth Date"
            hintText="e.g 13.07.1995"
            underlineStyle={underlineStyle}
            floatingLabelStyle={floatingLabelStyle}
          />
          <TextField
            type="email"
            floatingLabelText="Email (Future username)"
            required={true}
            value={this.state.email}
            onChange={this.onEmailChange}
            errorText={this.state.errorTextEmail}
            underlineStyle={underlineStyle}
            floatingLabelStyle={floatingLabelStyle}
          />
          <TextField
            type="password"
            floatingLabelText="Password"
            required={true}
            value={this.state.password}
            onChange={this.onPasswordChange}
            errorText={this.state.errorTextPW}
            underlineStyle={underlineStyle}
            floatingLabelStyle={floatingLabelStyle}
          />
          <div className="c-registration__button-wrapper">
            <RaisedButton
              label="REGISTER"
              labelStyle={buttonStyles}
              primary={true}
              onClick={this.onSubmit}
              disabled={this.isButtonDisabled}
            />
            <Link to={'/login'} className="p-reg__login-link">
              Just login?
            </Link>
          </div>
          <Snackbar
            open={this.state.errorBar.open}
            message={this.state.errorBar.message}
            autoHideDuration={3000}
            onRequestClose={this.closeSnackbar}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(UserRegistration);
