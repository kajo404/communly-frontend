import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

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

  getCheckboxClass() {
    return this.state.checked ? 'c-checkbox--checked' : 'c-checkbox';
  }

  render() {
    return (
      <li className="c-list-item">
        <Checkbox
          className={this.getCheckboxClass()}
          checked={this.state.checked}
          onCheck={this.updateCheck}
          label={this.props.value}
        />
      </li>
    );
  }
}

export default ListItem;
