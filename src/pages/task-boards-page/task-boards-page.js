import React, { Component } from 'react';
import TodoComponent from './todo-list';
import CreateTaskModal from './create-task-modal';

class TaskBoardPage extends Component {
  render() {
    return (
      <div className="p-task-boards">
        <TodoComponent />
        <TodoComponent />
        <TodoComponent />
        <CreateTaskModal />
      </div>
    );
  }
}

export default TaskBoardPage;
