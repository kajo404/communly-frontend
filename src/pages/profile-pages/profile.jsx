import React from 'react';

import UserDetailComponent from './userDetails';

class Profile extends React.Component {
  render() {
    return (
      <div className="p-profile">
        <UserDetailComponent />
      </div>
    );
  }
}

export default Profile;
