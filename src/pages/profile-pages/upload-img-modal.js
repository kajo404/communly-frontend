import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'react-avatar-edit';
import UserService from '../../services/user-service';
import UploadIcon from 'material-ui/svg-icons/editor/publish';

import './profile.scss';

export default class NewUploadModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      preview: null
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      preview: null
    });
  };

  handleUpload = () => {
    UserService.updateUserPicture(this.state.preview)
      .then(this.handleClose())
      .catch(e => {
        console.error(e);
        this.setState({ error: e });
      });
  };

  onClose() {
    this.setState({ preview: null });
  }

  onCrop(preview) {
    this.setState({ preview: preview });
  }

  get isButtonDisabled() {
    return this.state.preview === null;
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <RaisedButton
        label="Upload"
        primary={true}
        onClick={this.handleUpload}
        disabled={this.isButtonDisabled}
      />
    ];

    if (window.innerWidth > 700) {
      return (
        <div>
          <RaisedButton
            primary={true}
            onClick={this.handleOpen}
            icon={<UploadIcon />}
          />
          <Dialog
            title="Upload new Profile Picture"
            actions={actions}
            modal={true}
            open={this.state.open}
            contentStyle={{
              width: '700px'
            }}
            //className="c-profile-imgUpload-dialog"
          >
            <div className="c-profile-imgSelector">
              <Avatar
                height={255}
                width={350}
                onCrop={this.onCrop}
                onClose={this.onClose}
              />
              <div className="c-profile-imgPreviewContainer">
                <h3>Preview</h3>
                <img
                  className="c-profile-imgPreview"
                  style={{ display: this.state.preview ? 'inline' : 'none' }}
                  src={this.state.preview}
                  alt="Preview"
                />
              </div>
            </div>
          </Dialog>
        </div>
      );
    } else {
      return (
        <div>
          <RaisedButton
            primary={true}
            onClick={this.handleOpen}
            icon={<UploadIcon />}
          />
          <Dialog
            title="Upload new Profile Picture"
            actions={actions}
            modal={true}
            open={this.state.open}
            contentStyle={{
              width: '320px'
            }}
            //className="c-profile-imgUpload-dialog"
          >
            <div className="c-profile-imgSelector">
              <Avatar
                height={270}
                width={270}
                onCrop={this.onCrop}
                onClose={this.onClose}
              />
            </div>
          </Dialog>
        </div>
      );
    }
  }
}
