import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';

//TODO: integrate material-ui card, checkbox, button and input field

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };

    this.updateCheck = this.updateCheck.bind(this);
    this.getCheckboxClass = this.getCheckboxClass.bind(this);
  }

  updateCheck() {
    this.setState({
      checked: !this.state.checked
    });
  }

  getCheckboxClass() {
    return this.state.checked ? 'c-checkbox--checked' : 'c-checkbox';
  }

  render() {
    return (
      <li className="c-list-item">
        <Checkbox
          className={this.getCheckboxClass()}
          checked={this.state.checked}
          onCheck={this.updateCheck}
          label={this.props.value}
        />
      </li>
    );
  }
}

function List(props) {
  return (
    <div>
      {props.tasks.map((item, index) => <ListItem key={index} value={item} />)}
    </div>
  );
}

class TodoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: ''
    };

    this.updateTask = this.updateTask.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  onClick(event) {
    event.preventDefault();

    if (this.state.newTask.trim()) {
      this.setState({
        newTask: '',
        tasks: [...this.state.tasks, this.state.newTask]
      });
    }
  }

  updateTask(event) {
    this.setState({ newTask: event.target.value });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.onClick();
    }
  }

  render() {
    return (
      <Paper className="c-task-board" zDepth={1}>
        <TextField
          className="c-input-field"
          hintText="What needs to be done?"
          value={this.state.newTask}
          onChange={this.updateTask}
          onKeyPress={this.handleKeyPress}
        />
        <FlatButton
          label="Add task"
          className="c-add-button"
          onClick={this.onClick}
        />
        <List tasks={this.state.tasks} />
      </Paper>
    );
  }
}

export default TodoComponent;
