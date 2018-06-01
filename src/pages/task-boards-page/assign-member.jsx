import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

const customModalStyle = {
  width: '300px'
};

const headlineStyle = {
  marginBottom: '15px',
  display: 'inline-block'
};

const listStyle = {
  maxHeight: '200px',
  overflowY: 'scroll'
};

export default class AssignMemberModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      checkboxes: [
        'Felix',
        'Peter',
        'Lara',
        'Yasna',
        'Huhu',
        'Felix',
        'Peter',
        'Lara',
        'Yasna',
        'Huhu',
        'Test',
        'Hallo',
        'Yasna',
        'Huhu',
        'Test'
      ],
      assignedMember: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  addMembersToBoard = () => {
    console.log(
      'Theoretically added members to taskboard:',
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

  onChange(event, selectedValue) {
    this.setState({ assignedMember: selectedValue });
  }

  get buttonDisabled() {
    return !this.state.assignedMember;
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose}
      />,
      <RaisedButton
        label="Assign task"
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
          open={true}
        >
          <span style={headlineStyle}> Choose your task assignee: </span>
          <RadioButtonGroup
            name="members"
            onChange={this.onChange}
            style={listStyle}
          >
            {this.state.checkboxes.map((member, index) => (
              <RadioButton
                key={index}
                label={member}
                value={member}
                checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                uncheckedIcon={<ActionFavoriteBorder />}
              />
            ))}
          </RadioButtonGroup>
        </Dialog>
      </div>
    );
  }
}
