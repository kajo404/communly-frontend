import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import TaskService from '../../services/task-service';
import Avatar from 'material-ui/Avatar';

const avatarStyles = {
  top: '13px'
};

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
    this.props.assignMember(this.props.id);
  };

  getCheckboxClass() {
    return this.props.done ? 'c-checkbox--checked' : 'c-checkbox';
  }

  showAvatar = () => {
    return typeof this.props.assigned !== 'undefined';
  };

  render() {
    return (
      <li className="c-list-item">
        <Checkbox
          style={{ width: 'calc(100% - 70px)' }}
          className={this.getCheckboxClass()}
          checked={this.props.done}
          onCheck={this.updateCheck}
          label={this.props.value}
        />
        {this.showAvatar() ? (
          <i className="c-task_face-icon">
            <Avatar
              className={this.getCheckboxClass()}
              src={this.props.assigned.image}
              size={20}
              style={avatarStyles}
            />
          </i>
        ) : null}
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
