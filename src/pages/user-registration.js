import UserService from '../services/user-service';
import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { validateEmail } from '../services/email-validator';
import logo from './../assets/logo.png';
import './registration.scss';
import AnnouncementIcon from 'material-ui/svg-icons/action/announcement';
import TaskAllIcon from 'material-ui/svg-icons/action/assignment-ind';
import TaskDoneIcon from 'material-ui/svg-icons/action/assignment-turned-in';
import TaskUndoneIcon, {
  ActionAssignmentLate
} from 'material-ui/svg-icons/action/assignment-late';
import ListAuthorIcon from 'material-ui/svg-icons/av/playlist-add';
import ListMemberIcon from 'material-ui/svg-icons/av/playlist-add-check';

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

  closeSnackbar = () => {
    this.setState({
      errorBar: { message: '', open: false }
    });
  };

  render() {
    return (
      <div className="p-registration__page">
        <div className="p-registration__content">
          <div className="p-registration__left">
            <img
              className="c-registration__logo"
              src={logo}
              alt="communly logo"
            />
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
            <div className="c-registration__arrow bounce" />
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
        <div className="p-registration__services">
          <div className="p-registration__icons">
            <h2 className="p-registration__services-title"> Our services </h2>
            <div className="p-registration__icon-wrapper">
              <AnnouncementIcon
                color="#314f81"
                className="p-registration__icon margin-right"
              />
              <p className="c-icon__description">
                {' '}
                Announcements <br /> invidunt ut labore et dolore magna aliquyam
                erat, sed diam voluptua. At vero eos et accusam et justo duo
                dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat
              </p>
            </div>
            <div className="p-registration__icon-wrapper">
              <p className="c-icon__description">
                {' '}
                Task Lists <br /> Lorem ipsum dolor sited diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed
                diam voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat
              </p>
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
                {/* <TaskAllIcon color="#f5f5f5" className="p-registration__icon" /> */}
                <TaskDoneIcon
                  color="#314f81"
                  className="p-registration__icon"
                />
                <TaskUndoneIcon
                  color="#314f81"
                  className="p-registration__icon"
                />
              </div>
              <span className="c-icon__description">
                {' '}
                Activity tracking <br /> Lorem ipsum dolor sit amet, consetirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed
                diam voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat{' '}
              </span>
            </div>
          </div>
        </div>

        <div className="p-registration__team">
          <div className="p-registration__team-wrapper">
            <h2 className="c-team-headline"> Our Team </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserRegistration);
