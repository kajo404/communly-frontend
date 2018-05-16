import UserService from '../services/user-service';
import React from 'react';

import TextField from 'material-ui/TextField';
import { FlatButton } from 'material-ui';

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };
    this.login(user);
  }

  login(user) {
    UserService.login(user.username, user.password).then(result =>
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

  get getErrorText() {
    return this.state.password === '' ? 'This field is required' : '';
  }

  render() {
    return (
      <div className="p-user-login">
        <TextField
          floatingLabelText="User name"
          required={true}
          value={this.state.username}
          onChange={this.onUserNameChange}
          errorText="Password is required"
        />
        <br />
        <TextField
          floatingLabelText="Password"
          required={true}
          value={this.state.password}
          onChange={this.onPasswordChange}
          errorText={this.getErrorText}
        />
        <FlatButton
          label="LOGIN"
          className="c-login__button"
          onClick={this.onSubmit}
        />
      </div>
    );
  }
}

export default UserLogin;
