import React, { Component } from 'react';
import TodoComponent from './todo-list';
import TaskService from '../../services/task-service';
class TaskBoard extends Component {
  state = {
    tasks: []
  };

  constructor(props) {
    super(props);
    this.updateTasks();
  }

  createTask = newTaskText => {
    const newTask = {
      name: newTaskText,
      taskListId: this.props.board._id
    };

    TaskService.create(newTask)
      .then(response => console.log(response))
      .catch(error => console.error(error));
  };

  updateTasks() {
    this.tasksSubscription = TaskService.getAllTasks(this.props.board._id)
      .then(data => {
        this.setState({ tasks: data.tasks });
        console.log(this.state.tasks);
      })
      .catch(error => console.error(error));
  }

  //Idee - hier tasks von einem Board holen und nicht über das board liefern lassen.

  render() {
    return (
      <TodoComponent
        title={this.props.board.title}
        tasks={this.state.tasks}
        createTask={this.createTask}
      />
    );
  }
}

export default TaskBoard;
