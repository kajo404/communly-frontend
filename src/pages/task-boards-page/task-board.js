import React, { Component } from 'react';
import ListItem from './todo-list';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TaskService from '../../services/task-service';
class TaskBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: ''
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

  updateTasks() {
    this.tasksSubscription = TaskService.getAllTasks(this.props.board._id)
      .then(data => {
        this.setState({ tasks: data.tasks });
      })
      .catch(error => console.error(error));
  }

  onClick(event) {
    event.preventDefault();

    if (this.state.newTask.trim()) {
      this.createTask(this.state.newTask);
      this.setState({ newTask: '' });
    }
  }

  updateTask(event) {
    this.setState({ newTask: event.target.value });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.onClick(event);
    }
  }

  render() {
    return (
      <Paper className="c-task-board" zDepth={1}>
        <span>{this.props.board.title}</span>
        <div className="c-task-board__content">
          {this.state.tasks.map((task, index) => (
            <ListItem key={index} value={task.name} />
          ))}
        </div>
        <div class="c-task-board__actions">
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
