import React, { Component } from 'react';
import TodoComponent from './todo-list';
class TaskBoard extends Component {
  render() {
    return <TodoComponent title={this.props.board.title} />;
  }
}

export default TaskBoard;
