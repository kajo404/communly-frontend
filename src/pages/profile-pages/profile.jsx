import React from 'react';

import UserDetailComponent from './userDetails';
import UserActivityComponent from './userActivity';
import PlatformActivityComponent from './platformActivity';
import UserStatsComponent from './userStats';

import UserService from '../../services/user-service';

class Profile extends React.Component {
  render() {
    if (UserService.isUserAdmin()) {
      return (
        <div className="p-profile">
          <UserDetailComponent />
          <UserActivityComponent />
          <PlatformActivityComponent />
          <UserStatsComponent />
        </div>
      );
    } else {
      return (
        <div className="p-profile">
          <UserDetailComponent />
          <UserActivityComponent />
        </div>
      );
    }
  }
}

export default Profile;
