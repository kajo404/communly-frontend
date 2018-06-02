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
      open: false,
      allChecked: false,
      addedMembers: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        addedMembers: this.props.currentMembers.map(member => member._id)
      });
    }
  }

  addMembersToBoard = () => {
    this.props.addMembers(this.state.addedMembers);
  };

  handleToggle = key => event => {
    const members = [...this.state.addedMembers];

    if (members.includes(key)) {
      members.splice(members.indexOf(key), 1);
    } else {
      members.push(key);
    }

    this.setState({
      addedMembers: members
    });
  };

  toggleAll = () => {
    const members = !this.state.allChecked
      ? [...this.props.users.map(user => user._id)]
      : [];
    this.setState({
      addedMembers: members,
      allChecked: !this.state.allChecked
    });
  };

  alreadyMember(userId) {
    return this.state.addedMembers.includes(userId);
  }

  get buttonDisabled() {
    return false;
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.props.close} />,
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
                  <Checkbox
                    checked={this.alreadyMember(user._id)}
                    onCheck={this.handleToggle(user._id)}
                  />
                }
                primaryText={user.name}
              />
            ))}
          </List>
          <ListItem
            key={'all'}
            leftCheckbox={
              <Checkbox
                checked={this.state.allChecked}
                onCheck={this.toggleAll}
              />
            }
            primaryText="Check all"
          />
        </Dialog>
      </div>
    );
  }
}
