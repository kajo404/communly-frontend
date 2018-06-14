import UserService from '../services/user-service';
import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

const buttonStyles = {
  position: 'relative',
  marginTop: '30px'
};

const ERROR_CODES = {
  404: 'This user name does not exist!',
  401: 'Wrong password!',
  'Failed to fetch': 'Hm, could not connect to the server!'
};
class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorBar: {
        open: false,
        message: ''
      }
    };
  }

  onSubmit = event => {
    event.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };
    this.login(user);
  };

  login = user => {
    UserService.login(user.username, user.password)
      .then(result => {
        console.log(result);
        this.props.history.push('/announcements');
      })
      .catch(errorCode => {
        console.log(errorCode);
        this.setState({
          errorBar: {
            message: ERROR_CODES[errorCode],
            open: true
          }
        });
      });
  };

  onUserNameChange = event => {
    this.setState({ username: event.target.value.trim() });
    if (event.target.value.trim() === '') {
      this.setState({ displayError: 'none' });
    }
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value.trim() });
    if (event.target.value.trim() === '') {
      this.setState({ displayError: 'none' });
    }
  };

  get isButtonDisabled() {
    return this.state.username === '' || this.state.password === '';
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
          floatingLabelText="Email"
          required={true}
          value={this.state.username}
          onChange={this.onUserNameChange}
          errorText={this.getUsernameErrorText}
        />
        <br />
        <TextField
          type="password"
          floatingLabelText="Password"
          required={true}
          value={this.state.password}
          onChange={this.onPasswordChange}
          errorText={this.getPassErrorText}
        />
        <RaisedButton
          label="LOGIN"
          labelStyle={buttonStyles}
          primary={true}
          className="c-login__button"
          onClick={this.onSubmit}
          disabled={this.isButtonDisabled}
        />
        <br />
        <br />
        <Link to={'/registration'} className="p-login__reg-link">
          Not registered yet?
        </Link>
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

export default withRouter(UserLogin);
