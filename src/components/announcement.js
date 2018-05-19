import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

class AnnouncementComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Hello World',
      content: 'abcde',
      author: 'Lara Marie Reimer',
      createdAt: '19/05/2018'
    };

    this.updateTask = this.updateTask.bind(this);
    this.onClick = this.onClick.bind(this);
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

  render() {
    return (
      <Paper className="c-announcement" zDepth={1}>
        <div class="p-announcement">
          <h3>{this.state.title}</h3>
        </div>
        <hr />
        <div class="p-announcement">{this.state.content}</div>
        <div class="c-announcement-author">
          {this.state.author}, {this.state.createdAt}
        </div>
      </Paper>
    );
  }
}

export default AnnouncementComponent;
