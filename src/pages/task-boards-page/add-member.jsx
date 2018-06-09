import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';

const avatarStyles = {
  top: '13px'
};

const contentStyle = {
  width: '300px',
  paddingTop: '-20px'
};

const checkAllStyles = {
  marginTop: '-20px'
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

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        style={{ marginRight: '7px' }}
        onClick={this.props.close}
      />,
      <RaisedButton
        label="Add to board"
        primary={true}
        onClick={this.addMembersToBoard}
      />
    ];

    return (
      <div>
        <Dialog
          className="damn"
          actions={actions}
          modal={true}
          contentStyle={contentStyle}
          style={{ padding: 0 }}
          open={this.props.open}
        >
          <div className="c-add-members-modal__content">
            <Subheader>Choose members to add: </Subheader>
            <List style={{ padding: '10px' }}>
              <ListItem
                style={checkAllStyles}
                key={'all'}
                leftCheckbox={
                  <Checkbox
                    checked={this.state.allChecked}
                    onCheck={this.toggleAll}
                  />
                }
                primaryText="Check all"
              />

              {this.props.users.map((user, index) => (
                <ListItem
                  innerDivStyle={{ paddingBottom: '3px' }}
                  key={index}
                  rightAvatar={
                    <Avatar
                      src="http://via.placeholder.com/30x30"
                      size={30}
                      style={avatarStyles}
                    />
                  }
                  leftCheckbox={
                    <Checkbox
                      checked={this.alreadyMember(user._id)}
                      onCheck={this.handleToggle(user._id)}
                    />
                  }
                  primaryText={user.firstname + user.lastname}
                />
              ))}
            </List>
          </div>
        </Dialog>
      </div>
    );
  }
}
