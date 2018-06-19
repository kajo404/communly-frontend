import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import UserService from '../../services/user-service';

import AnnouncementIcon from 'material-ui/svg-icons/action/announcement';
import TaskAllIcon from 'material-ui/svg-icons/action/assignment-ind';
import TaskDoneIcon from 'material-ui/svg-icons/action/assignment-turned-in';
import TaskUndoneIcon from 'material-ui/svg-icons/action/assignment-late';
import ListAuthorIcon from 'material-ui/svg-icons/av/playlist-add';
import ListMemberIcon from 'material-ui/svg-icons/av/playlist-add-check';

import './profile.scss';

const conterDuration = 500;

class UserActivityComponent extends Component {
  constructor(props) {
    super(props);
    this.getActivity();
  }

  componentDidMount = () => {
    UserService.registerListener(
      'receivedUserActivityData',
      this.animate.bind(this)
    );
  };

  animate() {
    this.animateValue(
      'counter1',
      0,
      this.state.numberAnnouncements,
      conterDuration
    );
    this.animateValue(
      'counter2',
      0,
      this.state.numberTasklistsAuthor,
      conterDuration
    );
    this.animateValue(
      'counter3',
      0,
      this.state.numberTasklistsMember,
      conterDuration
    );
    this.animateValue(
      'counter4',
      0,
      this.state.numberAssignedTasks,
      conterDuration
    );
    this.animateValue(
      'counter5',
      0,
      this.state.numberAssignedTasksDone,
      conterDuration
    );
    this.animateValue(
      'counter6',
      0,
      this.state.numberAssignedTasksUndone,
      conterDuration
    );
  }

  animateValue(id, start, end, duration) {
    var obj = document.getElementById(id);
    if (end > 0 && end > start) {
      var range = end - start;
      var current = start;
      var stepTime = Math.abs(Math.floor(duration / range));
      var timer = setInterval(function() {
        current += 1;
        obj.innerHTML = current;
        if (current == end) {
          clearInterval(timer);
        }
      }, stepTime);
    } else {
      obj.innerHTML = 0;
    }
  }

  getActivity() {
    UserService.getAnnoncements()
      .then(result => {
        var numberAnnouncements = Object.keys(result.announcements).length;
        this.setState({ numberAnnouncements: numberAnnouncements });
      })
      .catch(e => {
        this.setState({ errorMessage: 'No Announcements for user!' });
        this.setState({ error: e });
      });

    UserService.getTasklistsAsAuthor()
      .then(result => {
        var numberTasklistsAuthor = Object.keys(result.tasklists).length;
        this.setState({ numberTasklistsAuthor: numberTasklistsAuthor });
      })
      .catch(e => {
        this.setState({ errorMessage: 'No Tasklists for user as author!' });
        this.setState({ error: e });
      });

    UserService.getTasklistsAsMemeber()
      .then(result => {
        var numberTasklistsMember = Object.keys(result.tasklists).length;
        this.setState({ numberTasklistsMember: numberTasklistsMember });
      })
      .catch(e => {
        this.setState({ errorMessage: 'No Tasklists for user as memeber!' });
        this.setState({ error: e });
      });

    UserService.getAllAsignedTasks()
      .then(result => {
        var numberAssignedTasks = Object.keys(result.tasks).length;
        var numberAssignedTasksDone = 0;

        result.tasks.forEach(element => {
          if (element.isDone) {
            numberAssignedTasksDone++;
          }
        });

        var numberAssignedTasksUndone =
          numberAssignedTasks - numberAssignedTasksDone;

        this.setState({
          numberAssignedTasks: numberAssignedTasks,
          numberAssignedTasksDone: numberAssignedTasksDone,
          numberAssignedTasksUndone: numberAssignedTasksUndone
        });
      })
      .catch(e => {
        this.setState({ errorMessage: 'No assigned Tasks for user!' });
        this.setState({ error: e });
      });
  }

  render() {
    return (
      <div className="c-userActivity-wrapper">
        <h2>User Activity</h2>

        <Paper className="c-userActivity-paper" zDepth={1}>
          <div className="c-userActivity-component">
            <AnnouncementIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">
              Created Announcements
            </div>
            <div id="counter1" className="c-userActivity-componentNumber" />
          </div>
          <div className="c-userActivity-component">
            <ListAuthorIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">
              Created Tasklists
            </div>
            <div id="counter2" className="c-userActivity-componentNumber" />
          </div>
          <div className="c-userActivity-component">
            <ListMemberIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">
              Attended Tasklists
            </div>
            <div id="counter3" className="c-userActivity-componentNumber" />
          </div>
          <div className="c-userActivity-component">
            <TaskAllIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">Assigned Tasks</div>
            <div id="counter4" className="c-userActivity-componentNumber" />
          </div>
          <div className="c-userActivity-component">
            <TaskDoneIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">
              Finished Assigned Tasks
            </div>
            <div id="counter5" className="c-userActivity-componentNumber" />
          </div>
          <div className="c-userActivity-component">
            <TaskUndoneIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">
              Open Assigned Tasks
            </div>
            <div id="counter6" className="c-userActivity-componentNumber" />
          </div>
        </Paper>
      </div>
    );
  }
}

export default UserActivityComponent;