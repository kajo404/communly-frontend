import React, { Component } from 'react';
import TodoComponent from './../components/todo-list';

class TaskBoardPage extends Component {
  render() {
    return (
      <div className="p-task-boards">
        <TodoComponent />
        <TodoComponent />
        <TodoComponent />
      </div>
    );
  }
}

export default TaskBoardPage;
