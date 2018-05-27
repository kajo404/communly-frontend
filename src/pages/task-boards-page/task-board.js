import React, { Component } from 'react';
import ListItem from './todo-list';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddMemberModal from './add-member';

import TaskService from '../../services/task-service';
import TaskBoardService from '../../services/task-board-service';

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
      tasks: [],
      newTask: '',
      addMembersOpen: false
    };

    this.updateTask = this.updateTask.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.updateTasks();
  }

  createTask = newTaskText => {
    const newTask = {
      name: newTaskText,
      taskListId: this.props.board._id
    };

    TaskService.create(newTask)
      .then(response => this.updateTasks())
      .catch(error => console.error(error));
  };

  updateTasks = () => {
    this.tasksSubscription = TaskService.getAllTasks(this.props.board._id)
      .then(data => {
        this.setState({ tasks: data.tasks });
      })
      .catch(error => console.error(error));
  };

  deleteBoard = () => {
    TaskBoardService.delete(this.props.board._id)
      .then(data => this.props.updateView())
      .catch(error => console.error(error));
  };

  onClick(event) {
    event.preventDefault();

    if (this.state.newTask.trim()) {
      this.createTask(this.state.newTask);
      this.setState({ newTask: '' });
    }
  }

  updateTask(event, newValue) {
    this.setState({ newTask: newValue });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.onClick(event);
    }
  }

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
        <span> {this.props.board.author} </span>
        <AddMemberModal
          open={this.state.addMembersOpen}
          handleClose={this.handleAddMembersClose}
        />
      </Paper>
    );
  }
}

export default TaskBoard;
