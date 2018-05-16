import UserService from '../services/user-service';
import React from 'react';
import { withRouter } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import { RaisedButton } from 'material-ui';

class UserRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordTouched: false,
      usernameTouched: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);

    this.buttonStyles = {
      position: 'relative',
      marginTop: '30px'
    };
  }

  onSubmit(event) {
    event.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };
    this.register(user);
  }

  register(user) {
    UserService.register(user.username, user.password).then(result =>
      console.log(result)
    );
    // TODO error handling
  }

  onUserNameChange(event) {
    this.setState({ username: event.target.value.trim() });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value.trim() });
  }

  get getPassErrorText() {
    return this.state.password === '' ? 'This field is required' : '';
  }

  get getUsernameErrorText() {
    return this.state.username === '' ? 'This field is required' : '';
  }

  get isButtonDisabled() {
    return this.state.username === '' || this.state.password === '';
  }

  render() {
    return (
      <div className="c-main-wrapper">
        <div className="p-user-login__content">
          <TextField
            floatingLabelText="User name"
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
            label="REGISTER"
            labelStyle={this.buttonStyles}
            primary={true}
            className="c-login__button"
            onClick={this.onSubmit}
            disabled={this.isButtonDisabled}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(UserRegistration);
