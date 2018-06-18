import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import AdminService from '../../services/admin-service';

import MaxIcon from 'material-ui/svg-icons/editor/vertical-align-top';
import AvgIcon from 'material-ui/svg-icons/editor/vertical-align-center';
import MinIcon from 'material-ui/svg-icons/editor/vertical-align-bottom';

import AnnouncementIcon from 'material-ui/svg-icons/action/speaker-notes';
import ListAuthorIcon from 'material-ui/svg-icons/av/playlist-add';
import ListMemberIcon from 'material-ui/svg-icons/av/playlist-add-check';
import TaskAllIcon from 'material-ui/svg-icons/action/assignment-ind';
import TaskDoneIcon from 'material-ui/svg-icons/action/assignment-turned-in';
import TaskUndoneIcon from 'material-ui/svg-icons/action/assignment-late';

import './profile.scss';

const conterDuration = 500;

class UserStatsComponent extends Component {
  constructor(props) {
    super(props);
    this.getUserStats();
  }

  componentDidMount = () => {
    AdminService.registerListener(
      'receivedUserStatsData',
      this.animate.bind(this)
    );
  };

  animate() {
    //Annoncements
    this.animateValue(
      'counterUS1',
      0,
      this.state.maxUserAnnouncements,
      conterDuration
    );
    this.animateValue(
      'counterUS2',
      0,
      this.state.avgUserAnnouncements,
      conterDuration
    );
    this.animateValue(
      'counterUS3',
      0,
      this.state.minUserAnnouncements,
      conterDuration
    );
    //Tasklists
    this.animateValue(
      'counterUS4',
      0,
      this.state.maxUserTasklists,
      conterDuration
    );
    this.animateValue(
      'counterUS5',
      0,
      this.state.avgUserTasklists,
      conterDuration
    );
    this.animateValue(
      'counterUS6',
      0,
      this.state.minUserTasklists,
      conterDuration
    );
    //Tasklist members
    this.animateValue(
      'counterUS7',
      0,
      this.state.maxMembersTasklists,
      conterDuration
    );
    this.animateValue(
      'counterUS8',
      0,
      this.state.avgMembersTasklists,
      conterDuration
    );
    this.animateValue(
      'counterUS9',
      0,
      this.state.minMembersTasklists,
      conterDuration
    );
    //Tasks
    this.animateValue(
      'counterUS10',
      0,
      this.state.maxAssignedTasks,
      conterDuration
    );
    this.animateValue(
      'counterUS11',
      0,
      this.state.avgAssignedTasks,
      conterDuration
    );
    this.animateValue(
      'counterUS12',
      0,
      this.state.minAssignedTasks,
      conterDuration
    );
    //done Tasks
    this.animateValue(
      'counterUS13',
      0,
      this.state.maxAssignedDoneTasks,
      conterDuration
    );
    this.animateValue(
      'counterUS14',
      0,
      this.state.avgAssignedDoneTasks,
      conterDuration
    );
    this.animateValue(
      'counterUS15',
      0,
      this.state.minAssignedDoneTasks,
      conterDuration
    );
    //undone Tasks
    this.animateValue(
      'counterUS16',
      0,
      this.state.maxAssignedUndoneTasks,
      conterDuration
    );
    this.animateValue(
      'counterUS17',
      0,
      this.state.avgAssignedUndoneTasks,
      conterDuration
    );
    this.animateValue(
      'counterUS18',
      0,
      this.state.minAssignedUndoneTasks,
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
        obj.innerHTML = current;
        if (current == Math.floor(end)) {
          clearInterval(timer);
          current += end % 1;
          obj.innerHTML = current;
        }
        current += 1;
      }, stepTime);
    } else {
      obj.innerHTML = 0;
    }
  }

  getUserStats() {
    AdminService.getUserStatsAnnuoncements()
      .then(result => {
        this.setState({
          maxUserAnnouncements: result.maxUserAnnouncements,
          avgUserAnnouncements: result.avgUserAnnouncements,
          minUserAnnouncements: result.minUserAnnouncements
        });
        AdminService.receivedStatsAnnouncements = true;
        AdminService.receivedUserStats();
      })
      .catch(e => {
        this.setState({
          errorMessage: 'User Stats Announcements not received'
        });
        this.setState({ error: e });
      });

    AdminService.getUserStatsTasklists()
      .then(result => {
        this.setState({
          maxUserTasklists: result.maxUserTasklists,
          avgUserTasklists: result.avgUserTasklists,
          minUserTasklists: result.minUserTasklists
        });
        AdminService.receivedStatsUserTasklists = true;
        AdminService.receivedUserStats();
      })
      .catch(e => {
        this.setState({
          errorMessage: 'User Stats Tasklists not received'
        });
        this.setState({ error: e });
      });

    AdminService.getUserStatsTasklistMembers()
      .then(result => {
        this.setState({
          maxMembersTasklists: result.maxMembersTasklists,
          avgMembersTasklists: result.avgMembersTasklists,
          minMembersTasklists: result.minMembersTasklists
        });
        AdminService.receivedStatsMembersTasklists = true;
        AdminService.receivedUserStats();
      })
      .catch(e => {
        this.setState({
          errorMessage: 'User Stats Tasklist members not received'
        });
        this.setState({ error: e });
      });

    AdminService.getUserStatsTasks()
      .then(result => {
        console.log(result);
        this.setState({
          maxAssignedTasks: result.maxAssignedTasks,
          avgAssignedTasks: result.avgAssignedTasks,
          minAssignedTasks: result.minAssignedTasks
        });
        AdminService.receivedStatsTasks = true;
        AdminService.receivedUserStats();
      })
      .catch(e => {
        this.setState({
          errorMessage: 'User Stats tasks not received'
        });
        this.setState({ error: e });
      });

    AdminService.getUserStatsDoneTasks()
      .then(result => {
        console.log(result);
        this.setState({
          maxAssignedDoneTasks: result.maxAssignedDoneTasks,
          avgAssignedDoneTasks: result.avgAssignedDoneTasks,
          minAssignedDoneTasks: result.minAssignedDoneTasks
        });
        AdminService.receivedStatsDoneTasks = true;
        AdminService.receivedUserStats();
      })
      .catch(e => {
        this.setState({
          errorMessage: 'User Stats done tasks not received'
        });
        this.setState({ error: e });
      });

    AdminService.getUserStatsUndoneTasks()
      .then(result => {
        console.log(result);
        this.setState({
          maxAssignedUndoneTasks: result.maxAssignedUndoneTasks,
          avgAssignedUndoneTasks: result.avgAssignedUndoneTasks,
          minAssignedUndoneTasks: result.minAssignedUndoneTasks
        });
        AdminService.receivedStatsUndoneTasks = true;
        AdminService.receivedUserStats();
      })
      .catch(e => {
        this.setState({
          errorMessage: 'User Stats undone tasks not received'
        });
        this.setState({ error: e });
      });
  }

  render() {
    return (
      <div className="c-userActivity-wrapper">
        <h2>User Statistics</h2>

        <Paper className="c-userActivity-paper" zDepth={1}>
          <div className="c-userStats-component">
            <AnnouncementIcon className="c-userStats-componentIcon" />
            <div className="c-userStats-componentTitle">
              Created Announcements
            </div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Max</div>
              <MaxIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS1" className="c-userStats-Number" />
            </div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Avg</div>
              <AvgIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS2" className="c-userStats-Number" />
            </div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Min</div>
              <MinIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS3" className="c-userStats-Number" />
            </div>
          </div>

          <div className="c-userStats-component">
            <ListAuthorIcon className="c-userStats-componentIcon" />
            <div className="c-userStats-componentTitle">Created Tasklists</div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Max</div>
              <MaxIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS4" className="c-userStats-Number" />
            </div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Avg</div>
              <AvgIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS5" className="c-userStats-Number" />
            </div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Min</div>
              <MinIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS6" className="c-userStats-Number" />
            </div>
          </div>
          <div className="c-userStats-component">
            <ListMemberIcon className="c-userStats-componentIcon" />
            <div className="c-userStats-componentTitle">
              Members in Tasklists
            </div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Max</div>
              <MaxIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS7" className="c-userStats-Number" />
            </div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Avg</div>
              <AvgIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS8" className="c-userStats-Number" />
            </div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Min</div>
              <MinIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS9" className="c-userStats-Number" />
            </div>
          </div>
          <div className="c-userStats-component">
            <TaskAllIcon className="c-userStats-componentIcon" />
            <div className="c-userStats-componentTitle">Assigned Tasks</div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Max</div>
              <MaxIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS10" className="c-userStats-Number" />
            </div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Avg</div>
              <AvgIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS11" className="c-userStats-Number" />
            </div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Min</div>
              <MinIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS12" className="c-userStats-Number" />
            </div>
          </div>
          <div className="c-userStats-component">
            <TaskDoneIcon className="c-userStats-componentIcon" />
            <div className="c-userStats-componentTitle">
              Assigned Done Tasks
            </div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Max</div>
              <MaxIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS13" className="c-userStats-Number" />
            </div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Avg</div>
              <AvgIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS14" className="c-userStats-Number" />
            </div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Min</div>
              <MinIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS15" className="c-userStats-Number" />
            </div>
          </div>
          <div className="c-userStats-component">
            <TaskUndoneIcon className="c-userStats-componentIcon" />
            <div className="c-userStats-componentTitle">
              Assigned Undone Tasks
            </div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Max</div>
              <MaxIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS16" className="c-userStats-Number" />
            </div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Avg</div>
              <AvgIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS17" className="c-userStats-Number" />
            </div>
            <div className="c-userStats-componentpart">
              <div className="c-userStats-Description">Min</div>
              <MinIcon className="c-userStats-componentPartIcon" />
              <div id="counterUS18" className="c-userStats-Number" />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default UserStatsComponent;
