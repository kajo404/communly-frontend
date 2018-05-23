import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TaskBoardService from '../../services/task-board-service';

const customModalStyle = {
  width: '450px'
};

export default class CreateTaskModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: {
        title: ''
      }
    };

    this.onTitleChange = this.onTitleChange.bind(this);
  }

  onTitleChange(event) {
    this.setState({ modal: { title: event.target.value } });
  }

  createTaskBoard = () => {
    TaskBoardService.create(this.state.modal.title)
      .then(response => {
        this.props.handleClose();
        this.setState({ modal: { title: '' } });
      })
      .catch(error => console.error(error));
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose}
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
        >
          <span> Name your new board. What is it about? </span>
          <TextField
            name="Task board title"
            label="User name"
            required={true}
            placeholder="Untitled"
            value={this.state.modal.title}
            onChange={this.onTitleChange}
          />
        </Dialog>
      </div>
    );
  }
}
