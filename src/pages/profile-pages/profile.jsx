import React from 'react';

import UserDetailComponent from './userDetails';
import UserActivityComponent from './userActivity';
import PlatformActivityComponent from './platformActivity';
import UserStatsComponent from './userStats';

import UserService from '../../services/user-service';

class Profile extends React.Component {
  get isAdmin() {
    return UserService.isUserAdmin();
  }

  render() {
    return (
      <div className="p-profile">
        <UserDetailComponent />
        <UserActivityComponent />
        {this.isAdmin ? <PlatformActivityComponent /> : null}
        {this.isAdmin ? <UserStatsComponent /> : null}
      </div>
    );
  }
}

export default Profile;
