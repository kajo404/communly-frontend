import React, { Component } from 'react';
import ListItem from './todo-list';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddMemberModal from './add-member';

import TaskBoardService from '../../services/task-board-service';
import UserService from '../../services/user-service';

const addButtonStyle = {
  position: 'absolute',
  top: '8px',
  right: '40px'
};

const iconStyle = {
  fontSize: '10px',
  width: '20px',
  height: '20px'
};
class TaskBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.board.tasks,
      newTask: '',
      users: [],
      addMembersOpen: false
    };
    this.updateTask = this.updateTask.bind(this);
    this.updateTasks();
    this.getUsers();
  }

  getUsers() {
    this.usersSubscription = UserService.getAllUsers()
      .then(response => this.setState({ users: response.users }))
      .catch(error => console.error(error));
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

  addMembers = members => {
    TaskBoardService.addMembers(this.props.board._id, members)
      .then(response => {
        this.props.updateView();
        this.handleAddMembersClose();
      })
      .catch(error => console.error(error));
  };

  updateTasks = () => {
    this.tasksSubscription = TaskBoardService.getAllTasks(this.props.board._id)
      .then(data => this.setState({ tasks: data.taskList.tasks }))
      .catch(error => console.error(error));
  };

  deleteBoard = () => {
    TaskBoardService.delete(this.props.board._id)
      .then(data => this.props.updateView())
      .catch(error => console.error(error));
  };

  onClick = event => {
    event.preventDefault();

    if (this.state.newTask.trim()) {
      this.createTask(this.state.newTask);
      this.setState({ newTask: '' });
    }
  };

  updateTask(event, newValue) {
    this.setState({ newTask: newValue });
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.onClick(event);
    }
  };

  openAddMembersModal = () => {
    this.setState({ addMembersOpen: true });
  };

  handleAddMembersClose = () => {
    this.setState({ addMembersOpen: false });
  };

  render() {
    return (
      <Paper className="c-task-board" zDepth={1}>
        <span>{this.props.board.title}</span>
        <FloatingActionButton
          mini={true}
          iconStyle={iconStyle}
          style={addButtonStyle}
          onClick={this.openAddMembersModal}
        >
          <ContentAdd />
        </FloatingActionButton>
        <i
          className="c-task-board__close-icon material-icons"
          onClick={this.deleteBoard}
        >
          {' '}
          close{' '}
        </i>
        <div className="c-task-board__content">
          {this.state.tasks.map((task, index) => (
            <ListItem
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
        <AddMemberModal
          users={this.state.users}
          addMembers={this.addMembers}
          open={this.state.addMembersOpen}
          handleClose={this.handleAddMembersClose}
        />
        <span> Author: {this.props.board.author.name} </span> <br />
        <span>
          {' '}
          Members: {this.props.board.members.map(member => member.name + ', ')}
        </span>
      </Paper>
    );
  }
}

export default TaskBoard;
