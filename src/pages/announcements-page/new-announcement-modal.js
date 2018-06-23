import React from 'react';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import AnnouncementsService from '../../services/announcements-service';

const customModalStyle = {
  width: '500px'
};

export default class NewAnnouncementModal extends React.Component {
  state = {
    open: false,
    title: '',
    content: '',
    isVotable: false
  };

  constructor(props) {
    super(props);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    const newAnnouncement = {
      title: this.state.title,
      content: this.state.content,
      isVotable: this.state.isVotable
    };

    AnnouncementsService.createAnnouncement(newAnnouncement)
      .then(data => {
        this.props.updateAnnouncements();

        this.handleClose();
      })
      .catch(error => console.error(error));
  };

  updateTitle = (event, newValue) => {
    this.setState({ title: newValue });
  };

  updateContent = (event, newValue) => {
    this.setState({ content: newValue });
  };

  updateVotable = () => {
    this.setState(oldState => {
      return {
        isVotable: !oldState.checked
      };
    });
  };

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <RaisedButton label="Add" primary={true} onClick={this.handleSave} />
    ];

    return (
      <div className="c-create-task-modal">
        <FloatingActionButton onClick={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add new announcement"
          actions={actions}
          modal={true}
          contentStyle={customModalStyle}
          open={this.state.open}
        >
          <TextField
            hintText="WHAT IS THE TITLE OF YOUR ANNOUNCEMENT?"
            fullWidth={true}
            onChange={this.updateTitle}
          />
          <br />
          <TextField
            hintText="WHAT DO YOU WANT TO TELL YOUR COHABITANTS?"
            multiLine={true}
            rows={4}
            fullWidth={true}
            onChange={this.updateContent}
          />
          <br />
          <Checkbox
            label="Add vote option"
            checked={this.state.isVotable}
            onCheck={this.updateVotable}
          />
        </Dialog>
      </div>
    );
  }
}
