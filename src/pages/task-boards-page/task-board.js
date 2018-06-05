import React, { Component } from 'react';
import Task from './task-component';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import TaskBoardService from '../../services/task-board-service';
import UserService from '../../services/user-service';

const addButtonStyle = {
  position: 'absolute',
  top: '13px',
  right: '43px'
};

const iconStyle = {
  fontSize: '10px',
  width: '20px',
  height: '20px'
};

const inputStyle = {
  backgroundColor: 'transparent',
  outline: 0,
  border: 0,
  fontSize: '16px',
  color: 'rgb(49,79,129)',
  maxWidth: '200px'
};
class TaskBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.board.tasks,
      newTask: '',
      currentTitle: this.props.board.title
    };
    this.textInputDebounceTimeoutIndex = -1;
    this.textInputDebounceTime = 500;
    this.updateTasks();
    console.log(this.props.board);
  }

  createTask = newTaskText => {
    const newTask = {
      name: newTaskText,
      taskBoardId: this.props.board._id
    };

    TaskBoardService.createTask(newTask)
      .then(response => this.updateTasks())
      .catch(error => console.error(error));
  };

  openAddMembersModal = () => {
    this.props.openAddMembersModal(
      this.props.board._id,
      this.props.board.members
    );
  };

  openDeleteConfirmationModal = () => {
    this.props.openDeleteConfirmationModal(this.props.board._id);
  };

  updateTasks = () => {
    this.tasksSubscription = TaskBoardService.getAllTasks(this.props.board._id)
      .then(data => this.setState({ tasks: data.taskList.tasks }))
      .catch(error => console.error(error));
  };

  // deleteBoard = () => {
  //   TaskBoardService.delete(this.props.board._id)
  //     .then(data => this.props.updateView())
  //     .catch(error => console.error(error));
  // };

  onClick = event => {
    event.preventDefault();

    if (this.state.newTask.trim()) {
      this.createTask(this.state.newTask);
      this.setState({ newTask: '' });
    }
  };

  updateTask = (event, newValue) => {
    this.setState({ newTask: newValue });
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.onClick(event);
    }
  };

  isUserAuthor = () => {
    return this.props.board.author._id === UserService.getCurrentUser().id;
  };

  onTitleChange = event => {
    this.setState({ currentTitle: event.target.value });
    if (this.textInputDebounceTimeoutIndex > -1) {
      clearTimeout(this.textInputDebounceTimeoutIndex);
    }
    this.textInputDebounceTimeoutIndex = setTimeout(
      () => this.updateBoardTitle(),
      this.textInputDebounceTime
    );
  };

  updateBoardTitle = () => {
    this.props.updateBoardTitle(this.props.board._id, this.state.currentTitle);
  };

  get deleteIconClasses() {
    return this.props.board.author._id === UserService.getCurrentUser().id
      ? 'c-task-board__close-icon material-icons'
      : 'c-task-board__close-icon material-icons disabled';
  }

  render() {
    return (
      <Paper className="c-task-board" zDepth={1}>
        <TextField
          id="title"
          ref={this.textInput}
          disabled={!this.isUserAuthor()}
          style={inputStyle}
          value={this.state.currentTitle}
          onChange={this.onTitleChange}
        />
        <br />
        <span>(Author: {this.props.board.author.name})</span> <br />
        <span>
          Members:{' '}
          {this.props.board.members.map(member => member.name).join(', ')}
        </span>
        <hr className="c-task-board__divider" />
        <FloatingActionButton
          mini={true}
          iconStyle={iconStyle}
          style={addButtonStyle}
          disabled={!this.isUserAuthor()}
          onClick={this.openAddMembersModal}
        >
          <ContentAdd />
        </FloatingActionButton>
        <i
          className={this.deleteIconClasses}
          onClick={this.openDeleteConfirmationModal}
        >
          close
        </i>
        <div className="c-task-board__content">
          {this.state.tasks.map((task, index) => (
            <Task
              key={index}
              id={task._id}
              value={task.name}
              updateView={this.updateTasks}
            />
          ))}
        </div>
        <div className="c-task-board__actions">
          <TextField
            className="c-input-field"
            hintText="What needs to be done?"
            value={this.state.newTask}
            onChange={this.updateTask}
            onKeyPress={this.handleKeyPress}
          />
          <RaisedButton
            label="Add task"
            primary={true}
            className="c-add-button"
            onClick={this.onClick}
          />
        </div>
      </Paper>
    );
  }
}

export default TaskBoard;
