import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'react-avatar-edit';
import UserService from '../../services/user-service';

const customModalStyle = {
  width: '700px'
};

export default class NewUploadModal extends React.Component {
  state = {
    open: false,
    preview: null
  };

  constructor(props) {
    super(props);

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

    return (
      <div>
        <RaisedButton label="Change" primary={true} onClick={this.handleOpen} />
        <Dialog
          title="Upload new Profile Picture"
          actions={actions}
          modal={true}
          contentStyle={customModalStyle}
          open={this.state.open}
        >
          <div className="c-profile-imgSelector">
            <Avatar
              width={390}
              height={295}
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
  }
}
