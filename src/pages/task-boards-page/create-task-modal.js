import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const customModalStyle = {
  width: '300px'
};

export default class CreateTaskModal extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <RaisedButton label="Create" primary={true} onClick={this.handleClose} />
    ];

    return (
      <div className="c-create-task-modal">
        <RaisedButton label="Create new task board" onClick={this.handleOpen} />
        <Dialog
          title="Dialog With Custom Width"
          actions={actions}
          modal={true}
          contentStyle={customModalStyle}
          open={this.state.open}
        />
      </div>
    );
  }
}
