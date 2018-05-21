import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import { RaisedButton } from 'material-ui';
import TodoComponent from './todo-list';

//TODO: integrate material-ui card, checkbox, button and input field

class TaskBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="c-task-board">
        <span> {this.props.board.title} </span>
        <TodoComponent />
      </div>
    );
  }
}

export default TaskBoard;
