import React, { Component } from 'react';
import TodoComponent from './../components/todo-list';

class TaskBoardPage extends Component {
  render() {
    return (
      <div class="p-task-boards">
        <TodoComponent />
        <TodoComponent />
        <TodoComponent />
      </div>
    );
  }
}

export default TaskBoardPage;
