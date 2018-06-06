import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import TaskService from '../../services/task-service';

class Task extends Component {
  updateCheck = () => {
    TaskService.changeTaskStatus(this.props.id, !this.props.done)
      .then(response => {
        this.props.updateView();
      })
      .catch(error => console.error(error));
  };

  deleteTask = () => {
    TaskService.delete(this.props.id)
      .then(res => this.props.updateView())
      .catch(error => console.error(error));
  };

  assignTask = () => {
    console.log('task theoretically assigned');
  };

  getCheckboxClass() {
    return this.props.done ? 'c-checkbox--checked' : 'c-checkbox';
  }

  render() {
    return (
      <li className="c-list-item">
        <Checkbox
          style={{ width: 'calc(100% - 30px)' }}
          className={this.getCheckboxClass()}
          checked={this.props.done}
          onCheck={this.updateCheck}
          label={this.props.value}
        />
        <i className="c-face-icon material-icons" onClick={this.assignTask}>
          {' '}
          face{' '}
        </i>
        <i className="c-close-icon material-icons" onClick={this.deleteTask}>
          {' '}
          cancel{' '}
        </i>
      </li>
    );
  }
}

export default Task;
