import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';

const customCheckboxStyle = {
  width: 'calc(100% - 20px)'
};
class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };

    this.updateCheck = this.updateCheck.bind(this);
    this.getCheckboxClass = this.getCheckboxClass.bind(this);
  }

  updateCheck() {
    this.setState({
      checked: !this.state.checked
    });
  }

  deleteTask = () => {
    console.log('task theoretically deleted');
  };

  assignTask = () => {
    console.log('task theoretically assigned');
  };

  getCheckboxClass() {
    return this.state.checked ? 'c-checkbox--checked' : 'c-checkbox';
  }

  render() {
    return (
      <li className="c-list-item">
        <Checkbox
          style={{ width: 'calc(100% - 30px)' }}
          className={this.getCheckboxClass()}
          checked={this.state.checked}
          onCheck={this.updateCheck}
          label={this.props.value}
        />
        <i className="c-face-icon material-icons" onClick={this.assignTask}>
          face
        </i>
        <i className="c-close-icon material-icons" onClick={this.deleteTask}>
          cancel
        </i>
      </li>
    );
  }
}

export default ListItem;
