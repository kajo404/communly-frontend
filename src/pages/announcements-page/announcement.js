import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

class AnnouncementComponent extends Component {
  date;

  constructor(props) {
    super(props);

    this.date = new Date(this.props.announcement.creationDate);

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
      <Paper className="c-announcement-paper" zDepth={1}>
        <div className="c-announcement-content">
          <h3>{this.props.announcement.title}</h3>
        </div>
        <hr />
        <div className="c-announcement-content">
          {this.props.announcement.content}
        </div>
        <div className="c-announcement-author">
          {this.props.announcement.author.name},{' '}
          {this.date.toLocaleDateString()}
        </div>
      </Paper>
    );
  }
}

export default AnnouncementComponent;
