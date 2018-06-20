import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import AdminService from '../../services/admin-service';
import UserService from '../../services/user-service';

import MaxIcon from 'material-ui/svg-icons/editor/vertical-align-top';
import AvgIcon from 'material-ui/svg-icons/editor/vertical-align-center';
import MinIcon from 'material-ui/svg-icons/editor/vertical-align-bottom';

import AnnouncementIcon from 'material-ui/svg-icons/action/speaker-notes';
import ListAuthorIcon from 'material-ui/svg-icons/av/playlist-add';
import ListMemberIcon from 'material-ui/svg-icons/av/playlist-add-check';
import TaskAllIcon from 'material-ui/svg-icons/action/assignment-ind';
import TaskDoneIcon from 'material-ui/svg-icons/action/assignment-turned-in';
import TaskOpenIcon from 'material-ui/svg-icons/action/assignment-late';

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
    UserService.animateValue(
      'counterUS1',
      0,
      this.state.maxUserAnnouncements,
      conterDuration
    );
    UserService.animateValue(
      'counterUS2',
      0,
      this.state.avgUserAnnouncements,
      conterDuration
    );
    UserService.animateValue(
      'counterUS3',
      0,
      this.state.minUserAnnouncements,
      conterDuration
    );
    //Tasklists
    UserService.animateValue(
      'counterUS4',
      0,
      this.state.maxUserTasklists,
      conterDuration
    );
    UserService.animateValue(
      'counterUS5',
      0,
      this.state.avgUserTasklists,
      conterDuration
    );
    UserService.animateValue(
      'counterUS6',
      0,
      this.state.minUserTasklists,
      conterDuration
    );
    //Tasklist members
    UserService.animateValue(
      'counterUS7',
      0,
      this.state.maxMembersTasklists,
      conterDuration
    );
    UserService.animateValue(
      'counterUS8',
      0,
      this.state.avgMembersTasklists,
      conterDuration
    );
    UserService.animateValue(
      'counterUS9',
      0,
      this.state.minMembersTasklists,
      conterDuration
    );
    //Tasks
    UserService.animateValue(
      'counterUS10',
      0,
      this.state.maxAssignedTasks,
      conterDuration
    );
    UserService.animateValue(
      'counterUS11',
      0,
      this.state.avgAssignedTasks,
      conterDuration
    );
    UserService.animateValue(
      'counterUS12',
      0,
      this.state.minAssignedTasks,
      conterDuration
    );
    //done Tasks
    UserService.animateValue(
      'counterUS13',
      0,
      this.state.maxAssignedDoneTasks,
      conterDuration
    );
    UserService.animateValue(
      'counterUS14',
      0,
      this.state.avgAssignedDoneTasks,
      conterDuration
    );
    UserService.animateValue(
      'counterUS15',
      0,
      this.state.minAssignedDoneTasks,
      conterDuration
    );
    //open Tasks
    UserService.animateValue(
      'counterUS16',
      0,
      this.state.maxAssignedOpenTasks,
      conterDuration
    );
    UserService.animateValue(
      'counterUS17',
      0,
      this.state.avgAssignedOpenTasks,
      conterDuration
    );
    UserService.animateValue(
      'counterUS18',
      0,
      this.state.minAssignedOpenTasks,
      conterDuration
    );
  }

  getUserStats() {
    AdminService.getUserStatsAnnouncements()
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

    AdminService.getUserStatsOpenTasks()
      .then(result => {
        this.setState({
          maxAssignedOpenTasks: result.maxAssignedOpenTasks,
          avgAssignedOpenTasks: result.avgAssignedOpenTasks,
          minAssignedOpenTasks: result.minAssignedOpenTasks
        });
        AdminService.receivedStatsOpenTasks = true;
        AdminService.receivedUserStats();
      })
      .catch(e => {
        this.setState({
          errorMessage: 'User Stats open tasks not received'
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
            <TaskOpenIcon className="c-userStats-componentIcon" />
            <div className="c-userStats-componentTitle">
              Assigned Open Tasks
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
