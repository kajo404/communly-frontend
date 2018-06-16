import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TaskBoardService from '../../services/task-board-service';

const customModalStyle = {
  maxWidth: '450px',
  width: '90%'
};

export default class CreateTaskBoardModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: {
        title: ''
      }
    };

    this.onTitleChange = this.onTitleChange.bind(this);
  }

  onTitleChange(event, newValue) {
    this.setState({ modal: { title: newValue } });
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.createTaskBoard();
    }
  };

  createTaskBoard = () => {
    if (this.state.title !== '') {
      TaskBoardService.create(this.state.modal.title)
        .then(response => {
          this.props.handleClose();
          this.setState({ modal: { title: '' } });
        })
        .catch(error => console.error(error));
    }
  };

  closeModal = () => {
    this.props.handleClose();
    this.setState({ modal: { title: '' } });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeModal}
        style={{ marginRight: '7px' }}
      />,
      <RaisedButton
        label="Create"
        primary={true}
        onClick={this.createTaskBoard}
      />
    ];

    return (
      <div className="c-create-task-modal">
        <Dialog
          actions={actions}
          modal={true}
          contentStyle={customModalStyle}
          open={this.props.open}
          actionsContainerStyle={{ paddingTop: 0 }}
        >
          <span> Name your new board. What is it about? </span>
          <TextField
            name="Task board title"
            label="User name"
            required={true}
            placeholder="Untitled"
            value={this.state.modal.title}
            onChange={this.onTitleChange}
            onKeyPress={this.handleKeyPress}
          />
        </Dialog>
      </div>
    );
  }
}
