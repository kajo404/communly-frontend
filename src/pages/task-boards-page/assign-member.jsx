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
      open: false,
      assignedMember: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  assignMember = () => {
    console.log('Theoretically assigned member');
    this.props.close();
    //TODO: Backend post call
  };

  onChange(event, selectedValue) {
    this.setState({ assignedMember: selectedValue });
  }

  get buttonDisabled() {
    return !this.state.assignedMember;
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.props.close} />,
      <RaisedButton
        label="Assign task"
        disabled={this.buttonDisabled}
        primary={true}
        onClick={this.assignMember}
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
          <span style={headlineStyle}> Choose your task assignee: </span>
          <RadioButtonGroup
            name="members"
            onChange={this.onChange}
            style={listStyle}
          >
            {this.props.members.map((member, index) => (
              <RadioButton
                key={index}
                label={member.firstname + ' ' + member.lastname}
                value={member._id}
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
