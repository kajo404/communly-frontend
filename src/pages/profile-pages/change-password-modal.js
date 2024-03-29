import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import UserService from '../../services/user-service';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import EditPwIcon from 'material-ui/svg-icons/image/edit';

import './profile.scss';

const customModalStyle = {
  width: '320px'
};

export default class NewEditModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      pwFieldType: 'password',
      password: '',
      passwordConfirmation: '',
      pwEquals: '',
      pwLongEnoughMessage: ''
    };

    this.handleChangeShowPw = this.handleChangeShowPw.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onConfirmationPasswordChange = this.onConfirmationPasswordChange.bind(
      this
    );
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, pwEquals: '' });
  };

  handleChangeShowPw(event) {
    if (event.target.checked) {
      this.setState({ pwFieldType: 'text' });
    } else {
      this.setState({ pwFieldType: 'password' });
    }
  }

  submit = () => {
    UserService.updatePassword(this.state.password)
      .then(this.handleClose())
      .catch(e => {
        console.error(e);
        this.setState({ error: e });
      });
  };

  onPasswordChange(event) {
    this.setState({
      password: event.target.value.trim()
    });

    var $message = document.getElementById('pwLong');

    if (event.target.value.trim() === '') {
      this.setState({
        pwLongEnoughMessage: ''
      });
    } else {
      if (event.target.value.length > 7) {
        $message.classList.remove('c-profile-message-error');
        $message.classList.add('c-profile-message-ok');
        this.setState({
          pwLongEnoughMessage: 'Password is secure.'
        });
      } else {
        $message.classList.remove('c-profile-message-ok');
        $message.classList.add('c-profile-message-error');
        this.setState({
          pwLongEnoughMessage: 'Min. 8 characters required!'
        });
      }
    }

    if (this.state.passwordConfirmation !== '') {
      $message = document.getElementById('pwEqualsMessage');
      var equals =
        this.state.passwordConfirmation === event.target.value.trim();
      if (equals) {
        $message.classList.remove('c-profile-message-error');
        $message.classList.add('c-profile-message-ok');
        this.setState({
          pwEquals: 'Passwords match.'
        });
      } else {
        $message.classList.remove('c-profile-message-ok');
        $message.classList.add('c-profile-message-error');
        this.setState({
          pwEquals: 'Passwords do not match!'
        });
      }
    }
  }

  onConfirmationPasswordChange(event) {
    this.setState({
      passwordConfirmation: event.target.value.trim()
    });

    var equals = this.state.password === event.target.value.trim();

    var $message = document.getElementById('pwEqualsMessage');

    if (event.target.value.trim() === '') {
      this.setState({
        pwEquals: ''
      });
    } else {
      if (equals) {
        $message.classList.remove('c-profile-message-error');
        $message.classList.add('c-profile-message-ok');
        this.setState({
          pwEquals: 'Passwords match.'
        });
      } else {
        $message.classList.remove('c-profile-message-ok');
        $message.classList.add('c-profile-message-error');
        this.setState({
          pwEquals: 'Passwords do not match!'
        });
      }
    }
  }

  get isButtonDisabled() {
    return (
      this.state.password === '' ||
      this.state.passwordConfirmation === '' ||
      this.state.password !== this.state.passwordConfirmation ||
      this.state.password.length < 8
    );
  }

  render() {
    const actions = [
      <Checkbox
        onCheck={this.handleChangeShowPw}
        label="Show Password"
        className="c-profile-checkbox-showHidePw"
      />,
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <RaisedButton
        label="Submit"
        primary={true}
        onClick={this.submit}
        disabled={this.isButtonDisabled}
      />
    ];

    return (
      <div>
        <RaisedButton
          label="Password"
          primary={true}
          onClick={this.handleOpen}
          icon={<EditPwIcon />}
        />
        <Dialog
          title="Change Password"
          actions={actions}
          modal={true}
          contentStyle={customModalStyle}
          open={this.state.open}
        >
          <TextField
            type={this.state.pwFieldType}
            floatingLabelText="New Password"
            required={true}
            value={this.state.password}
            onChange={this.onPasswordChange}
            // errorText={this.getNameErrorText}
          />
          <div className="c-profileModal-message" id="pwLong">
            {this.state.pwLongEnoughMessage}
          </div>
          <TextField
            type={this.state.pwFieldType}
            floatingLabelText="Password Confirmation"
            required={true}
            value={this.state.passwordConfirmation}
            onChange={this.onConfirmationPasswordChange}
            // errorText={this.getNameErrorText}
          />
          <div className="c-profileModal-message" id="pwEqualsMessage">
            {this.state.pwEquals}
          </div>
        </Dialog>
      </div>
    );
  }
}
