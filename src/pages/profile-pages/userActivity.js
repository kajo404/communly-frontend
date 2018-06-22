import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import UserService from '../../services/user-service';

import AnnouncementIcon from 'material-ui/svg-icons/action/speaker-notes';
import TaskAllIcon from 'material-ui/svg-icons/action/assignment-ind';
import TaskDoneIcon from 'material-ui/svg-icons/action/assignment-turned-in';
import TaskOpenIcon from 'material-ui/svg-icons/action/assignment-late';
import ListAuthorIcon from 'material-ui/svg-icons/av/playlist-add';
import ListMemberIcon from 'material-ui/svg-icons/av/playlist-add-check';

import './profile.scss';

class UserActivityComponent extends Component {
  constructor(props) {
    super(props);
    this.getUserActivity();
  }

  componentDidMount() {
    UserService.registerListener(
      'receivedUserActivityData',
      this.animate.bind(this)
    );
  }

  animate() {
    UserService.animateValue('counterUA1', 0, this.state.numberAnnouncements);
    UserService.animateValue('counterUA2', 0, this.state.numberTasklistsAuthor);
    UserService.animateValue('counterUA3', 0, this.state.numberTasklistsMember);
    UserService.animateValue('counterUA4', 0, this.state.numberAssignedTasks);
    UserService.animateValue(
      'counterUA5',
      0,
      this.state.numberAssignedTasksDone
    );
    UserService.animateValue(
      'counterUA6',
      0,
      this.state.numberAssignedTasksOpen
    );
  }

  getUserActivity() {
    UserService.getAnnoncements()
      .then(result => {
        var numberAnnouncements = Object.keys(result.announcements).length;
        this.setState({ numberAnnouncements: numberAnnouncements });
        UserService.receivedAnnouncements = true;
        UserService.receivedUserActivityData();
      })
      .catch(e => {
        this.setState({ errorMessage: 'No Announcements for user!' });
        this.setState({ error: e });
      });

    UserService.getTasklistsAsAuthor()
      .then(result => {
        var numberTasklistsAuthor = Object.keys(result.tasklists).length;
        this.setState({ numberTasklistsAuthor: numberTasklistsAuthor });
        UserService.receivedTasklistsAuthor = true;
        UserService.receivedUserActivityData();
      })
      .catch(e => {
        this.setState({ errorMessage: 'No Tasklists for user as author!' });
        this.setState({ error: e });
      });

    UserService.getTasklistsAsMemeber()
      .then(result => {
        var numberTasklistsMember = Object.keys(result.tasklists).length;
        this.setState({ numberTasklistsMember: numberTasklistsMember });
        UserService.receivedTasklistsMember = true;
        UserService.receivedUserActivityData();
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

        var numberAssignedTasksOpen =
          numberAssignedTasks - numberAssignedTasksDone;

        this.setState({
          numberAssignedTasks: numberAssignedTasks,
          numberAssignedTasksDone: numberAssignedTasksDone,
          numberAssignedTasksOpen: numberAssignedTasksOpen
        });
        UserService.receivedTasks = true;
        UserService.receivedUserActivityData();
      })
      .catch(e => {
        this.setState({ errorMessage: 'No assigned Tasks for user!' });
        this.setState({ error: e });
      });
  }

  render() {
    return (
      <div className="c-userActivity-wrapper">
        <h2>Own Activity</h2>

        <Paper className="c-userActivity-paper" zDepth={1}>
          <div className="c-userActivity-component">
            <AnnouncementIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">
              Created Announcements
            </div>
            <div id="counterUA1" className="c-userActivity-componentNumber" />
          </div>
          <div className="c-userActivity-component">
            <ListAuthorIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">
              Created Tasklists
            </div>
            <div id="counterUA2" className="c-userActivity-componentNumber" />
          </div>
          <div className="c-userActivity-component">
            <ListMemberIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">
              Attended Tasklists
            </div>
            <div id="counterUA3" className="c-userActivity-componentNumber" />
          </div>
          <div className="c-userActivity-component">
            <TaskAllIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">Assigned Tasks</div>
            <div id="counterUA4" className="c-userActivity-componentNumber" />
          </div>
          <div className="c-userActivity-component">
            <TaskDoneIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">
              Finished Assigned Tasks
            </div>
            <div id="counterUA5" className="c-userActivity-componentNumber" />
          </div>
          <div className="c-userActivity-component">
            <TaskOpenIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">
              Open Assigned Tasks
            </div>
            <div id="counterUA6" className="c-userActivity-componentNumber" />
          </div>
        </Paper>
      </div>
    );
  }
}

export default UserActivityComponent;
