import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';

const customModalStyle = {
  width: '300px'
};

export default class AddMemberModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      addedMembers: []
    };
  }

  addMembersToBoard = () => {
    this.props.addMembers(this.state.addedMembers);
  };

  handleToggle = key => event => {
    const addedMembers = this.state.addedMembers;
    if (addedMembers.indexOf(key) >= 0) {
      addedMembers.splice(addedMembers.indexOf(key), 1);
    } else {
      addedMembers.push(key);
    }
    this.setState({
      addedMembers: addedMembers
    });
  };

  get buttonDisabled() {
    return this.state.addedMembers.length === 0;
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose}
      />,
      <RaisedButton
        label="Add to board"
        disabled={this.buttonDisabled}
        primary={true}
        onClick={this.addMembersToBoard}
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
          <List>
            <Subheader>Choose members to add: </Subheader>
            {this.props.users.map((user, index) => (
              <ListItem
                key={index}
                leftCheckbox={
                  <Checkbox onCheck={this.handleToggle(user._id)} />
                }
                primaryText={user.name}
              />
            ))}
          </List>
        </Dialog>
      </div>
    );
  }
}
