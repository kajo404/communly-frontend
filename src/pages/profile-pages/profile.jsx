import React from 'react';

import UserDetailComponent from './userDetails';
import UserActivityComponent from './userActivity';

class Profile extends React.Component {
  render() {
    return (
      <div className="p-profile">
        <UserDetailComponent />
        <UserActivityComponent />
      </div>
    );
  }
}

export default Profile;
