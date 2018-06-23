import UserService from '../services/user-service';
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './home-page.scss';
import logo from './../assets/logo.png';
import eric from './../assets/eric.png';
import yasna from './../assets/yasna.png';
import lara from './../assets/lara.jpeg';
import jonas from './../assets/jonas.png';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { validateEmail } from '../services/email-validator';
import AnnouncementIcon from 'material-ui/svg-icons/action/announcement';
import TaskDoneIcon from 'material-ui/svg-icons/action/assignment-turned-in';
import TaskUndoneIcon from 'material-ui/svg-icons/action/assignment-late';
import ListAuthorIcon from 'material-ui/svg-icons/av/playlist-add';
import ListMemberIcon from 'material-ui/svg-icons/av/playlist-add-check';
import Avatar from 'material-ui/Avatar';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const buttonStyles = {
  position: 'relative'
};

const underlineStyle = {
  borderColor: '#314f81'
};

const floatingLabelStyle = {
  color: '#314f81'
};

const snackbarStyle = {
  backgroundColor: '#FF1744'
};

const ERROR_CODES = {
  400: 'This email is already taken!',
  404: 'This user name does not exist!',
  401: 'Wrong password!',
  'Failed to fetch': 'Hm, could not connect to the server!'
};

class HomePage extends React.Component {
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
      },
      registrationForm: true,
      loginPassword: '',
      loginUsername: ''
    };
  }

  componentDidMount() {
    const contentEl = document.querySelector('.p-registration__content');
    const starsContainerEl = document.createElement('div');
    starsContainerEl.classList.add('p-registration__stars');
    const starsCount = contentEl.clientWidth * contentEl.clientHeight / 20000;
    for (let i = 0; i < starsCount; i++) {
      const star = document.createElement('div');
      star.classList.add('p-registration__star');
      const pos = this.randomPosInside(contentEl);
      star.style.left = pos.x + 'px';
      star.style.top = pos.y + 'px';
      star.style.animationDuration = '1.5s';
      star.style.animationDelay = '-' + Math.random() * 3 + 's';
      starsContainerEl.appendChild(star);
    }
    contentEl.appendChild(starsContainerEl);
  }

  randomPosInside(el) {
    const x = Math.floor(Math.random() * el.clientWidth);
    const y = Math.floor(Math.random() * el.clientHeight);
    return { x, y };
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

  toggleRegistrationForm = () => {
    this.setState({ registrationForm: !this.state.registrationForm });
  };

  closeSnackbar = () => {
    this.setState({
      errorBar: { message: '', open: false }
    });
  };

  ///////LOGIN///////
  onLoginSubmit = event => {
    event.preventDefault();

    const user = {
      username: this.state.loginUsername,
      password: this.state.loginPassword
    };
    this.login(user);
  };

  login = user => {
    UserService.login(user.username, user.password)
      .then(result => {
        this.props.history.push('/announcements');
      })
      .catch(errorCode => {
        let errorText = '';
        if (typeof ERROR_CODES[errorCode] === 'undefined') {
          errorText = errorCode;
        } else {
          errorText = ERROR_CODES[errorCode];
          console.log(errorText);
        }
        this.setState({
          errorBar: {
            open: true,
            message: errorText
          }
        });
      });
  };

  onLoginUserNameChange = (event, value) => {
    this.setState({ loginUsername: value.trim() });
    const emailValid = validateEmail(value);
    if (!emailValid && value.trim() !== '') {
      this.setState({ errorTextEmail: 'Please enter a valid email address!' });
    } else {
      this.setState({ errorTextEmail: '' });
    }
  };

  onLoginPasswordChange = (event, value) => {
    this.setState({ loginPassword: value.trim() });
    if (value.length < 8) {
      this.setState({
        errorTextPW: 'Your password should be at least 8 characters!'
      });
    } else {
      this.setState({ errorTextPW: '' });
    }
  };

  get isLoginButtonDisabled() {
    return this.state.loginUsername === '' || this.state.loginPassword < 8;
  }

  render() {
    return (
      <div className="p-registration__page">
        <div id="registration" className="p-registration__content">
          <img
            className="c-registration__logo"
            src={logo}
            alt="communly logo"
          />
          <div className="p-registration__left">
            <h1 className="p-registration__headline margin">
              This is{' '}
              <span className="c-registration__heading"> communly </span>
            </h1>
            <p className="light">
              {' '}
              Our application is a simple and intuitive web-based tool that
              allows living communities of an arbitrary size to plan and
              organize their cohabitation and track their activities.
              <span className="lila-color"> Just try it out! </span>{' '}
            </p>
            <p className="c-offer-text"> Check out what we offer </p>{' '}
            <AnchorLink
              offset={40}
              href="#services"
              className="c-registration__arrow bounce"
            />
          </div>
          {this.state.registrationForm ? (
            <div className="p-registration__form">
              <div className="dark-form-text">
                {' '}
                <h4 className="c-bold-text">
                  Register now - it's <span className="uppercase">free</span>!
                </h4>
              </div>

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
                <a
                  onClick={this.toggleRegistrationForm}
                  className="p-reg__login-link"
                >
                  Just login?
                </a>
              </div>
            </div>
          ) : (
            <div className="p-registration__form p-registration__form-login">
              <div className="dark-form-text">
                {' '}
                <h4>Login</h4>
              </div>
              <TextField
                floatingLabelText="Email"
                required={true}
                value={this.state.loginUsername}
                onChange={this.onLoginUserNameChange}
                errorText={this.state.errorTextEmail}
                underlineStyle={underlineStyle}
                floatingLabelStyle={floatingLabelStyle}
              />
              <br />
              <TextField
                type="password"
                floatingLabelText="Password"
                required={true}
                value={this.state.loginPassword}
                onChange={this.onLoginPasswordChange}
                errorText={this.state.errorTextPW}
                underlineStyle={underlineStyle}
                floatingLabelStyle={floatingLabelStyle}
              />
              <div className="c-registration__button-wrapper">
                <RaisedButton
                  label="LOGIN"
                  labelStyle={buttonStyles}
                  primary={true}
                  className="c-login__button"
                  onClick={this.onLoginSubmit}
                  disabled={this.isLoginButtonDisabled}
                />
                <a
                  onClick={this.toggleRegistrationForm}
                  className="p-reg__login-link"
                >
                  Not registered yet?
                </a>
              </div>
            </div>
          )}
        </div>
        <div id="services" className="p-registration__services">
          <div className="p-registration__icons">
            <h2 className="p-registration__services-title"> Our services </h2>
            <div className="p-registration__icon-wrapper">
              <AnnouncementIcon
                color="#314f81"
                className="p-registration__icon margin-right"
              />
              <div className="c-icon__description">
                {' '}
                <h3 className="c-bold-text">Announcements</h3> <br /> Easily
                share important information with your residents. Get a feeling
                about your residents opinion towards an announcement and make
                decisions by using the vote functionality. Communicating
                important information has never been so easy!
              </div>
            </div>
            <div className="p-registration__icon-wrapper">
              <div className="c-icon__description">
                {' '}
                <h3 className="c-bold-text">Task Lists</h3> <br />
                Create Task Lists and share them with your fellow residents.
                Assign responsibilities to let others know what they should be
                doing. When a task has been completed you can let others know by
                marking it as done. Sign up now and start organizing your next
                event!
              </div>
              <div className="margin-left">
                <ListAuthorIcon
                  color="#314f81"
                  className="p-registration__icon"
                />
                <ListMemberIcon
                  color="#314f81"
                  className="p-registration__icon"
                />
              </div>
            </div>
            <div className="p-registration__icon-wrapper wider-icons">
              <div className="margin-right">
                <TaskDoneIcon
                  color="#314f81"
                  className="p-registration__icon"
                />
                <TaskUndoneIcon
                  color="#314f81"
                  className="p-registration__icon"
                />
              </div>
              <div className="c-icon__description">
                {' '}
                <h3 className="c-bold-text">Activity tracking</h3> <br />
                Keep track of your own activities on the platform. You can see
                how many announcements & tasklists you've already created and
                get an overview of your assigned tasks.
                <br />
                <br />
                As an administrator you can even see how your whole community is
                doing on the platform and which tools are mostly used.{' '}
              </div>
            </div>
          </div>
        </div>

        <div className="p-registration__team">
          <div className="p-registration__team-wrapper">
            <h2 className="c-team-headline"> Our Team </h2>
            <div className="c-team-members">
              <div className="c-team-member">
                <Avatar src={eric} size={200} className="c-team-member-photo" />
                Eric Luyken
              </div>
              <div className="c-team-member">
                <Avatar
                  src={yasna}
                  size={200}
                  className="c-team-member-photo"
                />
                Yasna Mindilikova
              </div>
              <div className="c-team-member">
                <Avatar src={lara} size={200} className="c-team-member-photo" />
                Lara Marie Reimer
              </div>
              <div className="c-team-member">
                <Avatar
                  src={jonas}
                  size={200}
                  className="c-team-member-photo"
                />
                Jonas Kaltenbach
              </div>
            </div>
          </div>
        </div>
        <Snackbar
          open={this.state.errorBar.open}
          message={this.state.errorBar.message}
          autoHideDuration={3000}
          contentStyle={snackbarStyle}
          style={snackbarStyle}
          bodyStyle={snackbarStyle}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

export default withRouter(HomePage);
