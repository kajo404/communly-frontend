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
      checkboxes: [
        {
          name: 'Felix',
          checked: false
        },
        {
          name: 'Yasna',
          checked: false
        },
        {
          name: 'Peter',
          checked: false
        },
        {
          name: 'Jonas',
          checked: false
        },
        {
          name: 'Lara',
          checked: false
        }
      ]
    };
  }

  addMembersToBoard = () => {
    console.log(
      'Theoretically added members to taskboard',
      console.log(
        this.state.checkboxes.filter(member => member.checked === true)
      )
    );
    this.props.handleClose();
    //TODO: Backend post call
  };

  updateMembers() {
    //TODO: Add member to the choice popover (get them from boards)
  }

  handleToggle = key => event => {
    const newCheckboxes = this.state.checkboxes;
    newCheckboxes[key].checked = !newCheckboxes[key].checked;
    this.setState({
      checkboxes: newCheckboxes
    });
  };

  get buttonDisabled() {
    return this.state.checkboxes.every(checkbox => checkbox.checked === false);
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
            {this.state.checkboxes.map((member, index) => (
              <ListItem
                key={index}
                leftCheckbox={<Checkbox onCheck={this.handleToggle(index)} />}
                primaryText={member.name}
              />
            ))}
          </List>
        </Dialog>
      </div>
    );
  }
}
