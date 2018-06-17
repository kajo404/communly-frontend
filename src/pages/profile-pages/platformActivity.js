import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import AdminService from '../../services/admin-service';

import UserIcon from 'material-ui/svg-icons/action/account-box';
import AnnouncementIcon from 'material-ui/svg-icons/action/speaker-notes';
import TaskAllIcon from 'material-ui/svg-icons/action/assignment';
import TaskDoneIcon from 'material-ui/svg-icons/action/assignment-turned-in';
import TaskUndoneIcon from 'material-ui/svg-icons/action/assignment-late';
import ListAuthorIcon from 'material-ui/svg-icons/av/playlist-add';

import './profile.scss';

const conterDuration = 500;

class PlatformActivityComponent extends Component {
  constructor(props) {
    super(props);
    this.getPlatformActivity();
  }

  componentDidMount = () => {
    AdminService.registerListener(
      'receivedPlatformActivityData',
      this.animate.bind(this)
    );
  };

  animate() {
    this.animateValue('counterPA1', 0, this.state.userAmount, conterDuration);
    this.animateValue(
      'counterPA2',
      0,
      this.state.announcementAmount,
      conterDuration
    );
    this.animateValue(
      'counterPA3',
      0,
      this.state.tasklistAmount,
      conterDuration
    );
    this.animateValue('counterPA4', 0, this.state.taskAmount, conterDuration);
    this.animateValue(
      'counterPA5',
      0,
      this.state.doneTaskAmount,
      conterDuration
    );
    this.animateValue(
      'counterPA6',
      0,
      this.state.undoneTaskAmount,
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
        if (current == Math.floor(end)) {
          clearInterval(timer);
          current += end % 1;
          obj.innerHTML = current;
        }
      }, stepTime);
    } else {
      obj.innerHTML = 0;
    }
  }

  getPlatformActivity() {
    AdminService.getUserAmount()
      .then(result => {
        this.setState({ userAmount: result.userAmount });
        AdminService.receivedUserAmount = true;
        AdminService.receivedPlatformActivityData();
      })
      .catch(e => {
        this.setState({ errorMessage: 'User Amount not received' });
        this.setState({ error: e });
      });

    AdminService.getAnnouncementAmount()
      .then(result => {
        this.setState({ announcementAmount: result.announcementAmount });
        AdminService.receivedAnnouncementAmount = true;
        AdminService.receivedPlatformActivityData();
      })
      .catch(e => {
        this.setState({ errorMessage: 'Announcement Amount not received' });
        this.setState({ error: e });
      });

    AdminService.getTasklistAmount()
      .then(result => {
        this.setState({ tasklistAmount: result.tasklistAmount });
        AdminService.receivedTasklistAmount = true;
        AdminService.receivedPlatformActivityData();
      })
      .catch(e => {
        this.setState({ errorMessage: 'Tasklists Amount not received!' });
        this.setState({ error: e });
      });

    AdminService.getTaskAmount()
      .then(result => {
        this.setState({
          taskAmount: result.taskAmount,
          doneTaskAmount: result.doneTaskAmount,
          undoneTaskAmount: result.undoneTaskAmount
        });
        AdminService.receivedTaskAmount = true;
        AdminService.receivedPlatformActivityData();
      })
      .catch(e => {
        this.setState({ errorMessage: 'Task Amount not received!' });
        this.setState({ error: e });
      });
  }

  render() {
    return (
      <div className="c-userActivity-wrapper">
        <h2>Platform Activity</h2>

        <Paper className="c-userActivity-paper" zDepth={1}>
          <div className="c-userActivity-component">
            <UserIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">User Amount</div>
            <div id="counterPA1" className="c-userActivity-componentNumber" />
          </div>
          <div className="c-userActivity-component">
            <AnnouncementIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">
              Created Announcements
            </div>
            <div id="counterPA2" className="c-userActivity-componentNumber" />
          </div>
          <div className="c-userActivity-component">
            <ListAuthorIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">
              Created Tasklists
            </div>
            <div id="counterPA3" className="c-userActivity-componentNumber" />
          </div>
          <div className="c-userActivity-component">
            <TaskAllIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">Created Tasks</div>
            <div id="counterPA4" className="c-userActivity-componentNumber" />
          </div>
          <div className="c-userActivity-component">
            <TaskDoneIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">Finished Tasks</div>
            <div id="counterPA5" className="c-userActivity-componentNumber" />
          </div>
          <div className="c-userActivity-component">
            <TaskUndoneIcon className="c-userActivity-componentIcon" />
            <div className="c-userActivity-componentText">Open Tasks</div>
            <div id="counterPA6" className="c-userActivity-componentNumber" />
          </div>
        </Paper>
      </div>
    );
  }
}

export default PlatformActivityComponent;
