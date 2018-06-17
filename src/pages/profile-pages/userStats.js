import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import AdminService from '../../services/admin-service';

import MaxIcon from 'material-ui/svg-icons/editor/vertical-align-top';
import AvgIcon from 'material-ui/svg-icons/editor/vertical-align-center';
import MinIcon from 'material-ui/svg-icons/editor/vertical-align-bottom';

import AnnouncementIcon from 'material-ui/svg-icons/action/speaker-notes';
import ListAuthorIcon from 'material-ui/svg-icons/av/playlist-add';

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
        AdminService.receivedStatsTasklists = true;
        AdminService.receivedUserStats();
      })
      .catch(e => {
        this.setState({
          errorMessage: 'User Stats Announcements not received'
        });
        this.setState({ error: e });
      });

    AdminService.getUserStatsTasklistMembers()
      .then(result => {
        console.log(result);
      })
      .catch(e => {
        this.setState({
          errorMessage: 'User Stats Announcements not received'
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
        </Paper>
      </div>
    );
  }
}

export default UserStatsComponent;
